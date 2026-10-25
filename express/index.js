require("dotenv").config();

const apiRoute = require("./route/index");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { globalLimiter } = require("./middlewares/rateLimit.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);

app.get("/", (req, res) => {
  res.send("Express 서버 실행 중");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "API 테스트 성공",
  });
});

app.use("/api", apiRoute);
app.use(errorMiddleware);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB 연결 성공");

    const server = app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });

    let isShuttingDown = false;
    function shutdown() {
      if (isShuttingDown) return;
      isShuttingDown = true;
      console.log("서버 종료를 시작합니다.");

      const shutdownTimer = setTimeout(() => {
        console.error("10초안에 작업이 완료되지 않아 강제로 종료합니다.");
        process.exit(1); //종료 코드
      }, 10_000);

      shutdownTimer.unref(); // 이 타이머만 남았다면 기다리지 않고 종료

      server.close(async () => {
        console.log("진행 중인 요청이 끝나고 HTTP 서버가 닫혔습니다.");
        try {
          await mongoose.disconnect();
          console.log("DB 연결이 닫혔습니다.");

          clearTimeout(shutdownTimer); //예약한 종료 함수 취소
        } catch (error) {
          console.error("DB 종료 실패", error);
          process.exitCode = 1;
        }
      });
    }
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((error) => {
    console.error("MongoDB 연결 실패", error);
  });
