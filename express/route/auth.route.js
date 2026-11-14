const authRoute = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  loginController,
  logoutController,
  signupController,
  meController,
  refreshController,
  demoSessionController,
} = require("../controller/auth.controller");
const {
  loginLimiter,
  demoLimiter,
} = require("../middlewares/rateLimit.middleware");
authRoute.post("/login", loginLimiter, loginController);
authRoute.post("/demo-session", demoLimiter, demoSessionController);
authRoute.post("/logout", logoutController);
authRoute.post("/signup", signupController);
authRoute.post("/refresh", refreshController);
authRoute.get("/me", authMiddleware, meController);

module.exports = authRoute;
