"use client";

import { useState } from "react";

type TaxTypeValue = "taxable" | "taxFree";

export default function TaxType() {
  const [taxType, setTaxType] = useState<TaxTypeValue>("taxable");

  const onClickTaxable = () => {
    setTaxType("taxable");
  };

  const onClickTaxFree = () => {
    setTaxType("taxFree");
  };

  return (
    <section className="bg-card rounded-2xl border border-border p-5 space-y-4 w-full">
      <span className="text-sm text-muted-foreground">과세 유형</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <button
          className={`relative flex flex-col  px-4 py-2 rounded-xl border-2 ${
            taxType === "taxable"
              ? "border-primary bg-blue-50"
              : "border-border"
          }`}
          onClick={onClickTaxable}
        >
          {taxType === "taxable" && (
            <span className="absolute right-3 top-2 font-bold text-primary">
              *
            </span>
          )}
          <span>과세</span>
          <span className="text-sm text-muted-foreground">
            공급가에 VAT 10%가 자동 추가 됩니다.
          </span>
        </button>
        <button
          className={`relative flex flex-col  px-4 py-2 rounded-xl border-2 ${
            taxType === "taxFree"
              ? "border-primary bg-blue-100"
              : "border-border"
          }`}
          onClick={onClickTaxFree}
        >
          {taxType === "taxFree" && (
            <span className="absolute right-3 top-2 font-bold text-primary">
              *
            </span>
          )}
          <span>비과세</span>
          <span className="text-sm text-muted-foreground">
            부가세 없이 공급가로만 청구됩니다.
          </span>
        </button>
      </div>
    </section>
  );
}
