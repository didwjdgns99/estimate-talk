"use client";

import EstimateForm from "@/component/common/estimate/estimateForm";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti"; //애니메이션을 그려주는 함수
export default function EstimatePage() {
  const [pageState, setPageState] = useState<"default" | "loading" | "success">(
    "default",
  );

  useEffect(() => {
    if (pageState !== "success") return;

    confetti({
      particleCount: 12,
      startVelocity: 35,
      spread: 80,
      ticks: 100,
      origin: { x: 0.15, y: 0.6 },
    });

    confetti({
      particleCount: 12,
      startVelocity: 35,
      spread: 80,
      ticks: 100,
      origin: { x: 0.85, y: 0.6 },
    });
  }, [pageState]);

  return (
    <>
      {/* 로딩 화면 */}
      {pageState === "loading" && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />

          <p className="mt-4 text-lg font-semibold">
            견적서를 생성하고 있습니다.
          </p>
        </div>
      )}

      {pageState === "success" && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
          <div className="text-5xl mb-4">🎉</div>

          <p className="text-2xl font-bold text-primary">
            견적서가 완성되었습니다!
          </p>

          <p className="mt-2 text-gray-500">
            멋지게 작성했어요. 잠시 후 상세 페이지로 이동합니다.
          </p>
        </div>
      )}

      {/* 기존 작성 화면은 계속 마운트되어 있음 */}
      <div className="mx-2 md:max-w-5xl md:mx-auto flex flex-col items-start pl-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">새 견적서 작성</h1>

        <span className="text-[14px] text-gray-500 mb-8 md:text-[18px]">
          견적 내용을 입력하고 AI가 최종 검토를 도와드립니다.
        </span>

        <EstimateForm setPageState={setPageState} />
      </div>
    </>
  );
}
