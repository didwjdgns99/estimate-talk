const AppError = require("../utils/AppError");

function errorMiddleware(error, req, res, next) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
      code: error.code,
      data: null,
    });
  }

  if (
    error.name === "MongooseServerSelectionError" ||
    error.name === "MongoServerSelectionError" ||
    error.name === "MongoNetworkError"
  ) {
    return res.status(503).json({
      message: "데이터베이스에 연결할 수 없습니다.",
      code: "DATABASE_CONNECTION_ERROR",
      data: null,
    });
  }

  // 나머지 예상하지 못한 에러는 서버 내부 오류로 처리한다.
  return res.status(500).json({
    message: "서버 내부 오류가 발생했습니다.",
    code: "INTERNAL_SERVER_ERROR",
    data: null,
  });
}
