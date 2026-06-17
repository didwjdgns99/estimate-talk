"use server";

import { login, LoginRequest } from "@/apis/auth";
import { ApiError } from "@/lib/http";

export async function loginAction(payload: LoginRequest) {
  try {
    const data = await login(payload);

    return {
      isError: false,
      message: data.message,
      data,
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
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
