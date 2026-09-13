import { CompanyInfoResponse } from "@/apis/companyInfo";

type EstimateCompanyProps = {
  companyInfo?: CompanyInfoResponse;
};

export default function EstimateCompany({ companyInfo }: EstimateCompanyProps) {
  return (
    <section className="border-t border-gray-200 py-8 print:py-4">
      <h3 className="mb-4 text-sm font-semibold text-gray-500 print:mb-2">
        공급자 정보
      </h3>

      <div
        className="flex flex-col gap-6 md:flex-row md:gap-12 print:grid
      print:grid-cols-[1fr_100px]
      print:gap-4
      print:items-start"
      >
        <div
          className="grid flex-1 grid-cols-1 gap-y-3 text-sm md:grid-cols-2 md:gap-x-12 print:grid-cols-2
        print:gap-x-6
        print:gap-y-2"
        >
          <div className="flex gap-3">
            <span className="w-24 shrink-0 text-gray-500">상호</span>
            <span className="font-medium">{companyInfo?.companyName}</span>
          </div>

          <div className="flex gap-3">
            <span className="w-24 shrink-0 text-gray-500">대표자</span>
            <span className="font-medium">{companyInfo?.ceoName}</span>
          </div>

          <div className="flex gap-3">
            <span className="w-24 shrink-0 text-gray-500">사업자번호</span>
            <span className="font-medium">{companyInfo?.businessNumber}</span>
          </div>

          <div className="flex gap-3">
            <span className="w-24 shrink-0 text-gray-500">전화번호</span>
            <span className="font-medium">{companyInfo?.mobile}</span>
          </div>

          <div className="flex gap-3 md:col-span-2">
            <span className="w-24 shrink-0 text-gray-500">주소</span>
            <span className="font-medium break-words">
              {companyInfo?.address}
              {companyInfo?.detailAddress}
            </span>
          </div>

          <div className="flex gap-3 md:col-span-2">
            <span className="w-24 shrink-0 text-gray-500">이메일</span>
            <span className="font-medium break-all">{companyInfo?.email}</span>
          </div>
        </div>

        <div className="flex justify-end md:w-32 md:items-end md:justify-center print:w-24">
          <div
            className="flex items-center print:w-auto
        print:items-start
        print:justify-center"
          >
            <span>회사직인</span>
            {companyInfo?.stampUrl && (
              <img
                src={companyInfo.stampUrl}
                alt="회사 직인"
                className="h-24 w-24 object-contain print:h-14 print:w-14"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
