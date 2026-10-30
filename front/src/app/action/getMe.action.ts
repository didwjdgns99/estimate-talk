"use server";

import { getMe } from "@/apis/auth";

import { ApiError } from "@/lib/apiError";

export async function getMeAction() {
  try {
    const data = await getMe();

    return {
      isError: false,
      user: data.user,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        isError: true,
        status: error.status,
        message: error.message,
      };
    }

    return {
      isError: true,
      status: 500,
      message: "API 요청 실패했습니다.",
    };
  }
}
