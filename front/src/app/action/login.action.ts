"use server";

import { cookies } from "next/headers";
import { login, LoginRequest } from "@/apis/auth";
import { ApiError } from "../../lib/apiError";

export async function loginAction(payload: LoginRequest) {
  try {
    const data = await login(payload);

    if (!data.accessToken || !data.refreshToken) {
      return {
        isError: true,
        status: 500,
        message: "토큰이 없습니다.",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 초 단위: 1시간
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      isError: false,
      message: data.message,
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
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
