import Estimate from "@/component/common/estimate/estimate";

export default function EstimatePage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col items-start">
      <h1 className="text-4xl font-bold mb-2">새 견적서 작성</h1>
      <span className="text-gray-500 mb-8 text-[18px]">
        견적 내용을 입력하고 AI가 최종 검토를 도와드립니다.
      </span>
      <Estimate />;
    </div>
  );
}
