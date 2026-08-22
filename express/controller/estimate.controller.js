const { createEstimateService } = require("../service/estimate.service");

async function createEstimateController(req, res, next) {
  try {
    const userId = req.user.id;
    const payload = req.body;

    const estimate = await createEstimateService(userId, payload);

    return res.status(201).json({
      message: "견적서 생성완료",
      estimateId: estimate._id,
    });
  } catch (error) {
    console.error("createEstimateController error:", error);
    next(error);
  }
}

module.exports = {
  createEstimateController,
};
