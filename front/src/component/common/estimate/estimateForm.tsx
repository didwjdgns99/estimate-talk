"use client";

import Customer from "@/component/common/estimate/customer";
import TaxType from "@/component/common/estimate/taxType";
import CreateEstimate from "@/component/common/estimate/createEstimate";
import EstimateSummary from "@/component/common/estimate/estimateSummary";
import { useState } from "react";
import {
  EstimateItem,
  createEmptyItem,
} from "@/component/common/estimate/estimateItem";
import Button from "@/component/common/button/button";

export default function EstimateForm() {
  const [items, setItems] = useState<EstimateItem[]>([createEmptyItem()]);
  const [taxType, setTaxType] = useState<"taxable" | "taxFree">("taxable");

  const hasDiscount = items.some((item) => item.discountRate > 0);

  return (
    <div className="flex flex-col gap-5 w-full">
      <Customer />
      <TaxType taxType={taxType} setTaxType={setTaxType} />
      <CreateEstimate items={items} setItems={setItems} />
      <EstimateSummary
        items={items}
        taxType={taxType}
        hasDiscount={hasDiscount}
      />
      <Button children="견적서 생성하기" className="w-full text-lg mb-8" />
    </div>
  );
}
