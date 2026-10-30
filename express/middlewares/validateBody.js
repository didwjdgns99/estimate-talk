const AppError = require("../utils/AppError");

function validateBody(schema) {
  return (req, _, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(400, result.error.issues[0].message, "VALIDATION_ERROR"),
      );
    }

    req.body = result.data;
    next();
  };
}

module.exports = validateBody;
