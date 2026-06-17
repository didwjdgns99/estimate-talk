"use server";

import { signup, SignupRequest } from "@/apis/auth";
import { ApiError } from "@/lib/http";

export async function signupAction(payload: SignupRequest) {
  try {
    const data = await signup(payload);

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
