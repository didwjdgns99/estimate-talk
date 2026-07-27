const {
  createInfoService,
  getInfoService,
} = require("../service/info.service");

async function createInfo(req, res) {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const userId = req.user.id;
    console.log("생성할 때 userId:", userId);
    const companyInfo = await createInfoService(userId, req.body, req.file);

    return res.status(201).json({
      isError: false,
      message: "회사정보 등록 성공",
      data: companyInfo,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "회사정보 등록 실패",
      data: null,
    });
  }
}

async function getInfo(req, res) {
  try {
    const userId = req.user.id;
    console.log("조회할 때 userId:", userId);
    const companyInfo = await getInfoService(userId);

    return res.status(200).json({
      isError: false,
      message: companyInfo
        ? "회사정보 조회 성공"
        : "등록된 회사정보가 없습니다.",
      data: companyInfo,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "회사정보 조회 실패",
      data: null,
    });
  }
}

module.exports = { createInfo, getInfo };
