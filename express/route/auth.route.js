const authRoute = require("express").Router();
const {
  loginController,
  logoutController,
  signupController,
} = require("../controller/auth.controller");
const { loginLimiter } = require("../middlewares/reteLimit.middleware");
authRoute.post("/login", loginLimiter, loginController);
authRoute.post("/logout", logoutController);
authRoute.post("/signup", signupController);

module.exports = authRoute;
