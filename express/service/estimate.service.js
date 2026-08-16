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

module.exports = { createEstimateService };
