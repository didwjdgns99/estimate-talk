import { cookies } from "next/headers";
import { API_BASE_URL } from "./api";
import { ApiError } from "./apiError";

export async function refreshAccessToken() {
  const cookieStore = await cookies();

  // 1. 브라우저 쿠키에서 refreshToken 가져오기
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new ApiError(401, "리프레시 토큰이 없습니다.");
  }

  // 2. Express의 refresh API 호출
  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  // 3. refreshToken도 만료됐거나 유효하지 않은 경우
  if (!response.ok) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    throw new ApiError(401, "로그인이 만료되었습니다.");
  }

  const data = await response.json();

  // 4. Express에서 새 accessToken을 못 받은 경우
  if (!data.accessToken) {
    throw new ApiError(401, "액세스 토큰 재발급에 실패했습니다.");
  }

  // 5. 새 accessToken을 브라우저 쿠키에 저장
  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  // 6. 필요하면 재요청에서 바로 쓸 수 있게 반환
  return data.accessToken;
}
