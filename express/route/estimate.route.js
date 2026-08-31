const estimateRoute = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createEstimateController,
  getEstimateController,
  getEstimateListController,
} = require("../controller/estimate.controller");

estimateRoute.post("/", authMiddleware, createEstimateController);
estimateRoute.get("/:estimateId", authMiddleware, getEstimateController);
estimateRoute.get("/", authMiddleware, getEstimateListController);

module.exports = estimateRoute;
