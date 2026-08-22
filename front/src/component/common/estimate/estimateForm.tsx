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
import { useCreateEstimate } from "@/app/hook/estimate/useCreateEstimate";
import { useRouter } from "next/navigation";

export default function EstimateForm() {
  const [items, setItems] = useState<EstimateItem[]>([createEmptyItem()]);
  const [taxType, setTaxType] = useState<"taxable" | "taxFree">("taxable");
  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("");

  const hasDiscount = items.some((item) => item.discountRate > 0);
  const hasTitle = title.trim().length > 0;
  const hasCustomer = customer.trim().length > 0;
  const hasValidItems =
    items.length > 0 &&
    items.every(
      (item) =>
        item.description.trim().length > 0 &&
        item.quantity > 0 &&
        item.unitPrice > 0,
    );

  const canCreateEstimate = hasTitle && hasCustomer && hasValidItems;

  const { mutate: createEstimate } = useCreateEstimate();

  const router = useRouter();

  const handleCreateEstimate = () => {
    createEstimate(
      {
        items,
        taxType,
        title,
        customer,
      },
      {
        onSuccess: (result) => {
          router.push(`/estimate/${result.data.estimateId}`);
        },
        onError: (error) => {
          console.error(error);
          alert("견적서 생성에 실패했습니다.");
        },
      },
    );
    //온석세스 에러 처리
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <Customer
        title={title}
        setTitle={setTitle}
        customer={customer}
        setCustomer={setCustomer}
      />
      <TaxType taxType={taxType} setTaxType={setTaxType} />
      <CreateEstimate items={items} setItems={setItems} />
      <EstimateSummary
        items={items}
        taxType={taxType}
        hasDiscount={hasDiscount}
      />
      <Button
        onClick={handleCreateEstimate}
        children="견적서 생성하기"
        className="w-full text-lg mb-8"
        disabled={!canCreateEstimate}
      />
    </div>
  );
}
