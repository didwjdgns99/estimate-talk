// "use server";

// import { cookies } from "next/headers";
// import { getMe } from "@/apis/auth";
// import { ApiError } from "@/lib/http";

// export async function getMeAction() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return {
//         isError: true,
//         status: 401,
//         message: "로그인이 필요합니다.",
//       };
//     }

//     const data = await getMe(token);

//     return {
//       isError: false,
//       user: data.user,
//     };
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return {
//         isError: true,
//         status: error.status,
//         message: error.message,
//       };
//     }

//     return {
//       isError: true,
//       status: 500,
//       message: "유저 정보를 가져오지 못했습니다.",
//     };
//   }
// }

"use server";

import { cookies } from "next/headers";
import { getMe } from "@/apis/auth";
import { ApiError } from "@/lib/http";

export async function getMeAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("========== getMeAction 시작 ==========");
    console.log("getMeAction token:", token);

    if (!token) {
      console.log("getMeAction token 없음");

      return {
        isError: true,
        status: 401,
        message: "로그인이 필요합니다.",
      };
    }

    const data = await getMe(token);

    console.log("getMeAction data:", data);
    console.log("========== getMeAction 성공 ==========");

    return {
      isError: false,
      user: data.user,
    };
  } catch (error) {
    console.log("========== getMeAction catch ==========");
    console.log("getMeAction error:", error);

    if (error instanceof ApiError) {
      console.log("ApiError status:", error.status);
      console.log("ApiError message:", error.message);

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
