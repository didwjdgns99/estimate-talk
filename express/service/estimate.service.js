const Estimate = require("../models/estimate.model");

async function createEstimateService(userId, payload) {
  const { items, title, taxType, customer } = payload;

  const estimate = await Estimate.create({
    userId,
    title,
    customer,
    taxType,
    items,
  });

  return estimate;
}

async function getEstimateService(userId, estimateId) {
  const estimate = await Estimate.findOne({
    _id: estimateId,
    userId,
  }).lean();

  if (!estimate) {
    const error = new Error("견적서를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return estimate;
}

async function getEstimateListService(userId) {
  return Estimate.find({ userId }).sort({ createdAt: -1 }).lean();
}

module.exports = {
  createEstimateService,
  getEstimateService,
  getEstimateListService,
};
