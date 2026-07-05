"use client";

import Input from "@/component/common/Input";
import Button from "@/component/common/button/button";

export default function Estimate() {
  return (
    <form className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-2xl bg-white p-8 shadow">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <Input
            label="견적서 제목"
            placeholder="견적서 제목을 입력하세요"
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Input
            label="고객사명"
            placeholder="고객 이름을 입력하세요"
            className="w-full"
          />
        </div>
      </div>
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">견적 항목</span>
          <Button variant="primary" type="button" children="항목 추가" />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <Input
              label="품목/내용"
              placeholder="견적상품을 입력하세요."
              className="w-full"
            />
          </div>

          <Input label="수량" placeholder="1" className="w-full" />
          <Input label="단가" placeholder="10,000" className="w-full" />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-4">
          <span className="text-xl font-semibold">총 금액</span>
          <span className="text-primary font-bold text-3xl">10,000</span>
        </div>
        <Button
          variant="primary"
          type="submit"
          children="AI 검토 후 저장하기"
          className="w-full text-lg"
        />
      </div>
    </form>
  );
}
