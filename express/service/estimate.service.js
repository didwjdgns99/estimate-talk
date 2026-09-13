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

async function getEstimateListService(userId, { page, limit, searchKeyword }) {
  const skip = (page - 1) * limit;
  const filter = {
    userId,
  };
  if (searchKeyword) {
    filter.$or = [
      {
        customer: {
          $regex: searchKeyword,
          $options: "i",
        },
      },
      {
        title: {
          $regex: searchKeyword,
          $options: "i",
        },
      },
    ];
  }
  return Estimate.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); //데이터수정이 아닌 조회용 몽고디비로부터 객체로 받기
}

module.exports = {
  createEstimateService,
  getEstimateService,
  getEstimateListService,
};
