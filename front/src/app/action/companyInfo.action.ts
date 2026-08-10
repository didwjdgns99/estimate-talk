"use server";

import {
  createCompanyInfo,
  getCompanyInfo,
  checkBusinessStatus,
} from "@/apis/companyInfo";
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

export async function getCompanyInfoAction() {
  try {
    const data = await getCompanyInfo();

    return {
      isError: false,
      message: "회사정보를 가져왔습니다.",
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function checkBusinessStatusAction(businessNumber: string) {
  try {
    const data = await checkBusinessStatus(businessNumber);
    return {
      isError: false,
      message: "사업자등록번호 상태를 확인했습니다.",
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
