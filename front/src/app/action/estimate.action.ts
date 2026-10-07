"use server";

import { getCompanyInfo } from "@/apis/companyInfo";
import {
  createEstimateApi,
  CreateEstimateRequest,
  getEstimateDetail,
  getEstimateApi,
  deleteEstimateApi,
} from "@/apis/Esimate";
import { ApiError } from "@/lib/apiError";

export async function createEstimateAction(data: CreateEstimateRequest) {
  try {
    const result = await createEstimateApi(data);
    return {
      isError: false,
      message: result.message,
      data: result,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function getEstimateDetailAction(estimateId: string) {
  const [estimate, company] = await Promise.all([
    getEstimateDetail(estimateId),
    getCompanyInfo(),
  ]);

  return {
    estimate,
    company,
  };
}

export async function getEstimateAction(
  page = 1,
  limit = 3,
  searchKeyword: string = "",
) {
  try {
    const result = await getEstimateApi(page, limit, searchKeyword);
    return {
      isError: false,
      message: result.message,
      data: result,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function deleteEstimateAction(estimateId: string) {
  try {
    const result = await deleteEstimateApi(estimateId);
    return {
      isError: false,
      message: result.message,
      data: result,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    throw new Error("견적서 삭제 중 오류가 발생했습니다.");
  }
}
