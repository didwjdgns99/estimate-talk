require("dotenv").config();

const apiRoute = require("./route/index");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { globalLimiter } = require("./middlewares/reteLimit.middleware");

const app = express();

const PORT = process.env.PORT || 8080;

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

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB 연결 성공");

    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  })
  .catch((error) => {
    console.error("MongoDB 연결 실패", error);
  });
