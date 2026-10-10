const {
  createEstimateService,
  getEstimateService,
  getEstimateListService,
  deleteEstimateService,
} = require("../service/estimate.service");
const AppError = require("../utils/AppError");

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

async function deleteEstimateController(req, res, next) {
  try {
    const userId = req.user.id;
    const { estimateId } = req.params;

    const estimate = await deleteEstimateService(userId, estimateId);

    return res.status(200).json({
      message: "견적서 삭제 성공",
    });
  } catch (error) {
    return next(error);
  }
}

async function getEstimateListController(req, res, next) {
  try {
    const userId = req.user.id;

    const pageValue = req.query.page;
    const limitValue = req.query.limit;
    const page = pageValue === undefined ? 1 : Number(pageValue);
    const limit = limitValue === undefined ? 3 : Number(limitValue);
    const searchKeyword = req.query.searchKeyword ?? "";

    if (
      (pageValue !== undefined && typeof pageValue !== "string") ||
      !Number.isSafeInteger(page) ||
      page < 1 ||
      (limitValue !== undefined && typeof limitValue !== "string") ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100 ||
      !Number.isSafeInteger((page - 1) * limit)
    ) {
      throw new AppError(
        400,
        "page는 양의 정수, limit은 1~100 사이의 정수여야 합니다.",
        "INVALID_PAGINATION",
      );
    }

    if (typeof searchKeyword !== "string") {
      throw new AppError(
        400,
        "검색어는 문자열이어야 합니다.",
        "INVALID_SEARCH_KEYWORD",
      );
    }
    const { estimateList, totalCount, thisMonthCount } =
      await getEstimateListService(userId, {
        page,
        limit,
        searchKeyword,
      });

    return res.status(200).json({
      message: "견적서 조회 성공",
      estimateList,
      totalCount,
      thisMonthCount,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEstimateController,
  getEstimateController,
  getEstimateListController,
  deleteEstimateController,
};
