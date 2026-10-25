const AppError = require("../utils/AppError");

function validateParams(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return next(
        new AppError(400, result.error.issues[0].message, "VALIDATION_ERROR"),
      );
    }

    req.params = result.data;
    next();
  };
}

module.exports = validateParams;
