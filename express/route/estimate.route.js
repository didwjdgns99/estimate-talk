const estimateRoute = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createEstimateController,
} = require("../controller/estimate.controller");

estimateRoute.post("/", authMiddleware, createEstimateController);

module.exports = estimateRoute;
