"use client";

import { useParams } from "next/navigation";
import CustomorDetail from "./customorDetail";
import EstimateContent from "./estimateContent";
import { useGetEstimateDetail } from "@/app/hook/estimate/useGetEstimateDetail";
import EstimateDetailSummery from "@/app/(main)/estimateDetail/[estimateId]/estimateDetailSummery";
import EstimateCompany from "./estimateCompany";

export default function EstimateDetail() {
  const params = useParams<{ estimateId: string }>();
  const { data, isLoading, isError } = useGetEstimateDetail(params.estimateId);

  console.log("전체 data:", data);
  console.log("estimate:", data?.estimate);
  console.log("company:", data?.company);
  const companyInfo = data?.company?.data;
  const items = data?.estimate?.estimate?.items ?? [];
  const taxType = data?.estimate?.estimate?.taxType;
  const customer = data?.estimate.estimate.customer;
  const createdAt = data?.estimate.estimate.createdAt;
  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (isError) {
    return <div>견적서를 불러오지 못했습니다.</div>;
  }

  return (
    <section className="max-w-5xl mx-auto flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg mb-10">
      <div className="bg-primary/15 flex justify-center w-full py-10 ">
        <h2 className="text-4xl font-bold text-black/70">견 적 서</h2>
      </div>
      <div className="px-8">
        <CustomorDetail
          taxType={taxType}
          customer={customer}
          createdAt={createdAt}
        />
        <EstimateContent items={items} taxType={taxType} />
        <EstimateDetailSummery items={items} taxType={taxType} />
        <EstimateCompany companyInfo={companyInfo} />
      </div>
    </section>
  );
}
