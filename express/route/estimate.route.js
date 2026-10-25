const estimateRoute = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const validateParams = require("../middlewares/validateParams");
const validateQuery = require("../middlewares/validateQuery");
const estimateParamsSchema = require("../schemas/estimate/estimateParamsSchema");
const getEstimateListSchema = require("../schemas/estimate/getEstimateListSchema");
const {
  createEstimateController,
  getEstimateController,
  getEstimateListController,
  deleteEstimateController,
} = require("../controller/estimate.controller");

estimateRoute.post("/", authMiddleware, createEstimateController);
estimateRoute.get(
  "/:estimateId",
  authMiddleware,
  validateParams(estimateParamsSchema),
  getEstimateController,
);
estimateRoute.get(
  "/",
  authMiddleware,
  validateQuery(getEstimateListSchema),
  getEstimateListController,
);
estimateRoute.delete(
  "/:estimateId",
  authMiddleware,
  validateParams(estimateParamsSchema),
  deleteEstimateController,
);

module.exports = estimateRoute;
