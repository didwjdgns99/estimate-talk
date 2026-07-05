"use server";

import { createCompanyInfo } from "@/apis/companyInfo";
import { ApiError } from "@/lib/http";

export async function createCompanyInfoAction(formData: FormData) {
  try {
    const data = await createCompanyInfo(formData);

    return {
      isError: false,
      message: "회사정보가 저장되었습니다.",
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
