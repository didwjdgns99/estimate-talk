const CompanyInfo = require("../models/companyInfo.model");
const Estimate = require("../models/estimate.model");

async function createDemoData(userId, demoExpiresAt) {
  const companySuffix = userId.slice(-10);

  await Promise.all([
    Estimate.insertMany([
      {
        userId,
        title: "사무실 인테리어 공사",
        customer: "한빛건설",
        taxType: "taxable",
        items: [
          {
            description: "회의실 조명 교체",
            quantity: 12,
            unitPrice: 85000,
            discountRate: 5,
          },
          {
            description: "전기 배선 정비",
            quantity: 1,
            unitPrice: 420000,
            discountRate: 0,
          },
        ],
        demoExpiresAt,
      },
      {
        userId,
        title: "업무용 가구 납품",
        customer: "다온파트너스",
        taxType: "taxable",
        items: [
          {
            description: "회의용 테이블",
            quantity: 3,
            unitPrice: 320000,
            discountRate: 10,
          },
          {
            description: "사무용 의자",
            quantity: 12,
            unitPrice: 145000,
            discountRate: 0,
          },
        ],
        demoExpiresAt,
      },
      {
        userId,
        title: "정기 유지보수",
        customer: "새봄테크",
        taxType: "taxFree",
        items: [
          {
            description: "월간 시스템 점검",
            quantity: 1,
            unitPrice: 550000,
            discountRate: 0,
          },
        ],
        demoExpiresAt,
      },
    ]),
    CompanyInfo.create({
      userId,
      companyName: "견적톡 데모상사",
      businessNumber: companySuffix,
      ceoName: "홍길동",
      businessType: "서비스업",
      businessItem: "소프트웨어",
      manager: "데모 담당자",
      phone: "02-0000-0000",
      fax: "",
      mobile: "010-0000-0000",
      email: `demo-${userId}@example.invalid`,
      zipCode: "00000",
      address: "서울특별시",
      detailAddress: "데모 주소",
      demoExpiresAt,
    }),
  ]);
}

module.exports = { createDemoData };
