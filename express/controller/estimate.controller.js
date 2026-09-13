const {
  createEstimateService,
  getEstimateService,
  getEstimateListService,
} = require("../service/estimate.service");

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

async function getEstimateController(req, res, next) {
  try {
    const userId = req.user.id;
    const { estimateId } = req.params;

    console.log("estimateId:", estimateId);
    console.log("login userId:", userId);

    const estimate = await getEstimateService(userId, estimateId);

    return res.status(200).json({
      message: "견적서 조회 성공",
      estimate,
    });
  } catch (error) {
    next(error);
  }
}

async function getEstimateListController(req, res, next) {
  try {
    const userId = req.user.id;

    const page = Number(req.query.page) || 1; //문자열로 들어와서 number
    const limit = Number(req.query.limit) || 3;
    const searchKeyword = req.query.searchKeyword || "";
    const estimateList = await getEstimateListService(userId, {
      page,
      limit,
      searchKeyword,
    });

    return res.status(200).json({
      message: "견적서 조회 성공",
      estimateList,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEstimateController,
  getEstimateController,
  getEstimateListController,
};
