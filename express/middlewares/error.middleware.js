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
  //중복 저장
  if (error.code === 11000) {
    return res.status(409).json({
      message: "이미 등록된 정보입니다.",
      code: "DUPLICATE_KEY",
      data: null,
    });
  }
  //castError 타입에러
  //validationError 스키마 규칙 에러
  if (error.name === "CastError" || error.name === "ValidationError") {
    return res.status(400).json({
      message: "입력한 데이터의 형식이나 값을 확인해 주세요.",
      code: "VALIDATION_ERROR",
      data: null,
    });
  }

  if (error.name === "MulterError") {
    const isFileTooLarge = error.code === "LIMIT_FILE_SIZE";

    return res.status(isFileTooLarge ? 413 : 400).json({
      message: isFileTooLarge
        ? "업로드 가능한 파일 크기를 초과했습니다."
        : "파일 업로드 요청을 확인해 주세요.",
      code: isFileTooLarge ? "FILE_TOO_LARGE" : "FILE_UPLOAD_ERROR",
      data: null,
    });
  }

  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      message: "도장 파일은 stamp 필드로 한 개만 보내주세요.",
      code: error.code,
    });
  }

  if (error.type === "entity.parse.failed" && error.status === 400) {
    return res.status(400).json({
      message: "요청 본문의 JSON 형식이 올바르지 않습니다.",
      code: "INVALID_JSON",
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

module.exports = errorMiddleware;
