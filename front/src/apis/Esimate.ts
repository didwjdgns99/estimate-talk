import { http } from "@/lib/http";

export type EstimateItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
};

export type CreateEstimateRequest = {
  title: string;
  customer: string;
  taxType: "taxable" | "taxFree";
  items: EstimateItem[];
};

export async function createEstimateApi(data: CreateEstimateRequest) {
  return http(
    "/api/estimate",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    {
      authRequired: true,
    },
  );
}

export async function getEstimateDetail(estimateId: string) {
  return http(
    `/api/estimate/${estimateId}`,
    {
      method: "GET",
    },
    { authRequired: true },
  );
}

export async function getEstimateApi() {
  return http(
    "/api/estimate",
    {
      method: "GET",
    },
    {
      authRequired: true,
    },
  );
}
