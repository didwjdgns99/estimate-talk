"use client";

import Input from "@/component/common/Input";

type CustomerProps = {
  title: string;
  customer: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setCustomer: React.Dispatch<React.SetStateAction<string>>; //유즈스테이트 세터함수 타입
};

export default function Customer({
  title,
  customer,
  setTitle,
  setCustomer,
}: CustomerProps) {
  return (
    <section className="bg-card rounded-2xl border border-border p-5 space-y-4 w-full">
      <span className="text-sm text-muted-foreground">기본 정보</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <Input
          label="견적서 제목"
          placeholder="견적서 제목을 입력하세요"
          className="w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="고객사명"
          placeholder="고객사명을 입력하세요"
          className="w-full"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>
    </section>
  );
}
