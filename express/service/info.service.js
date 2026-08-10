const CompanyInfo = require("../models/companyInfo.model");
const { uploadStamp, getStampUrl } = require("./s3.service");

async function createInfoService(userId, payload, file) {
  const {
    companyName,
    businessNumber,
    ceoName,
    businessType,
    businessItem,
    manager,
    phone,
    fax,
    mobile,
    email,
    zipCode,
    address,
    detailAddress,
  } = payload;

  const cleanBusinessNumber = businessNumber.replaceAll("-", "");
  const existingEmail = await CompanyInfo.findOne({ email });

  // const existingBusinessNumber = await CompanyInfo.findOne({
  //   businessNumber: cleanBusinessNumber,
  // });

  // if (existingBusinessNumber) {
  //   const err = new Error("이미 존재하는 사업자등록번호입니다.");
  //   err.status = 409;
  //   throw err;
  // }

  if (existingEmail) {
    const err = new Error("이미 존재하는 이메일입니다.");
    err.status = 409;
    throw err;
  }

  const stampKey = await uploadStamp(file, userId);

  const companyInfo = await CompanyInfo.findOneAndUpdate(
    { userId },
    {
      companyName,
      businessNumber: cleanBusinessNumber,
      ceoName,
      businessType,
      businessItem,
      manager,
      phone,
      fax,
      mobile,
      email,
      zipCode,
      address,
      detailAddress,
      stampKey,
    },
    { new: true, upsert: true },
  );

  return companyInfo;
}

async function getInfoService(userId) {
  // 회사정보를 일반 JavaScript 객체 형태로 조회
  const companyInfo = await CompanyInfo.findOne({ userId }).lean();

  if (!companyInfo) {
    return null;
  }

  // DB의 stampKey를 이용해서 직인 이미지 URL 생성
  const stampUrl = await getStampUrl(companyInfo.stampKey);

  // 기존 회사정보에 stampUrl을 추가해서 반환
  return {
    ...companyInfo,
    stampUrl,
  };
}

async function checkBusinessStatusService(businessNumber) {
  const cleanBusinessNumber = businessNumber.replaceAll("-", "");

  const response = await fetch(
    `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NTS_SERVICE_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        b_no: [cleanBusinessNumber],
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "사업자 상태조회에 실패했습니다.");
    error.status = response.status;
    throw error;
  }
  const business = data.data?.[0];

  // 국세청에 등록되지 않은 사업자번호
  if (!business || !business.b_stt) {
    const error = new Error("등록되지 않은 사업자등록번호입니다.");
    error.status = 404;
    throw error;
  }

  return business;
}

module.exports = {
  createInfoService,
  getInfoService,
  checkBusinessStatusService,
};
