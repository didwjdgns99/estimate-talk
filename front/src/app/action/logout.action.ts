"use server";

import { cookies } from "next/headers";
import { logout } from "@/apis/auth";
import { ApiError } from "@/lib/http";

export default async function logoutAction() {
  try {
    const data = await logout();
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return data;
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
