const Estimate = require("../models/estimate.model");
const AppError = require("../utils/AppError");

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

async function deleteEstimateService(userId, estimateId) {
  const estimate = await Estimate.findOneAndDelete({
    _id: estimateId,
    userId,
  });

  if (!estimate) {
    throw new AppError(
      404,
      "삭제할 견적서를 찾을 수 없습니다.",
      "ESTIMATE_NOT_FOUND",
    );
  }
}

async function getEstimateListService(userId, { page, limit, searchKeyword }) {
  const skip = (page - 1) * limit;
  const filter = {
    userId,
  };
  if (searchKeyword) {
    //$or 조건 1,조건2중 하나라도 맞으면 검색결과에 포함되도록
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

  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [estimateList, totalCount, thisMonthCount] = await Promise.all([
    Estimate.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Estimate.countDocuments(filter),
    Estimate.countDocuments({
      userId,
      createdAt: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    }),
  ]);
  return {
    estimateList,
    totalCount,
    thisMonthCount,
  };
}

module.exports = {
  createEstimateService,
  getEstimateService,
  getEstimateListService,
  deleteEstimateService,
};
