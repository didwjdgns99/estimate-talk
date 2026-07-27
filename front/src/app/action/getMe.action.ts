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

    if (!token) {
      return {
        isError: true,
        status: 401,
        message: "로그인이 필요합니다.",
      };
    }

    const data = await getMe(token);

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
