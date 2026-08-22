const CompanyInfo = require("../models/companyInfo.model");
const { uploadStamp, getStampUrl } = require("./s3.service");
const AppError = require("../utils/AppError");

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

  if (!companyInfo.stampKey) {
    return {
      ...companyInfo,
      stampUrl: null,
    };
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

  try {
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

    if (!response.ok) {
      throw new AppError(
        502,
        "사업자 상태조회에 실패했습니다.",
        "BUSINESSC_CHECK_SERVER_ERROR",
      );
    }

    const data = await response.json();

    const business = data.data?.[0];

    //비지니스상태 없으면 없는 사업자 처리
    if (!business?.b_stt) {
      throw new AppError(
        404,
        "등록되지 않은 사업자등록번호입니다.",
        "BUSINESS_NOT_FOUND",
      );
    }

    return business;
  } catch (error) {
    // try 안에서 이미 AppError로 변환한 에러는 그대로 다시 던진다.
    if (error instanceof AppError) {
      throw error;
    }
    //파싱실패
    if (error instanceof SyntaxError) {
      throw new AppError(
        502,
        "사업자 상태조회 서버의 응답이 올바르지 않습니다.",
        "NTS_INVALID_RESPONSE",
      );
    }
    //서버연결 실패
    //fetch는 연결 실패하면 타입에러가 나도록 설계되어 있음
    if (error instanceof TypeError) {
      throw new AppError(
        502,
        "사업자 상태조회 서버에 연결할 수 없습니다.",
        "NTS_CONNECTION_ERROR",
      );
    }

    throw error;
  }
}

module.exports = {
  createInfoService,
  getInfoService,
  checkBusinessStatusService,
};
