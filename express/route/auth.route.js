const authRoute = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  loginController,
  logoutController,
  signupController,
  meController,
} = require("../controller/auth.controller");
const { loginLimiter } = require("../middlewares/rateLimit.middleware");
authRoute.post("/login", loginLimiter, loginController);
authRoute.post("/logout", logoutController);
authRoute.post("/signup", signupController);
authRoute.get("/me", authMiddleware, meController);

module.exports = authRoute;
