import building from "@/public/building.svg";
import Image from "next/image";
import CompanyInfo from "@/component/common/companyInfo/conpanyInfo";

export default function InfoPage() {
  return (
    <div className="max-w-[640px] m-auto">
      <div className="flex mb-10">
        <Image src={building} alt="회사 이미지" width={50} height={50} />
        <div>
          <h1 className="text-[30px] font-semibold">회사정보 설정</h1>
          <span className="text-secondary-text">
            견적서에 표시될 회사 정보를 입력하세요.
          </span>
        </div>
      </div>
      <CompanyInfo />
    </div>
  );
}
