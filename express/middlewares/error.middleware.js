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
}
