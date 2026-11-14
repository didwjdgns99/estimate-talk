import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

type DemoSessionResponse = {
  accessToken?: string;
  refreshToken?: string;
};

export async function GET(request: NextRequest) {
  try {
    const apiResponse = await fetch(`${API_BASE_URL}/api/auth/demo-session`, {
      method: "POST",
      cache: "no-store",
    });

    if (!apiResponse.ok) {
      console.error("Demo session API failed:", apiResponse.status);
      return NextResponse.json(
        { message: "데모 세션을 시작하지 못했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 },
      );
    }

    const session = (await apiResponse.json()) as DemoSessionResponse;
    if (!session.accessToken || !session.refreshToken) {
      console.error("Demo session API returned no tokens.");
      return NextResponse.json(
        { message: "데모 세션 응답이 올바르지 않습니다." },
        { status: 502 },
      );
    }

    const response = NextResponse.redirect(new URL("/", request.url));
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    response.cookies.set("accessToken", session.accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 12,
    });
    response.cookies.set("refreshToken", session.refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Demo session request failed:", error);
    return NextResponse.json(
      { message: "데모 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 },
    );
  }
}
