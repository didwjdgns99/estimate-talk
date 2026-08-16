import { createEstimateApi, CreateEstimateRequest } from "@/apis/Esimate";
import { ApiError } from "@/lib/http";

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
