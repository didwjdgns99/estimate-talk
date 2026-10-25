const AppError = require("../utils/AppError");

function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(
        new AppError(400, result.error.issues[0].message, "VALIDATION_ERROR"),
      );
    }

    // Express 5에서는 req.query에 대입할 수 없어 별도 속성에 저장한다.
    req.validatedQuery = result.data;
    next();
  };
}

module.exports = validateQuery;
