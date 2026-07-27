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

  const companyInfo = await CompanyInfo.create({
    userId,
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
  });

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

module.exports = {
  createInfoService,
  getInfoService,
};
