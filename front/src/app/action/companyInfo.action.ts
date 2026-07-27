"use server";

import { createCompanyInfo, getCompanyInfo } from "@/apis/companyInfo";
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
    console.log("========== getCompanyInfoAction 시작 ==========");
    const data = await getCompanyInfo();
    console.log("getCompanyInfoAction data:", data);
    console.log("========== getCompanyInfoAction 성공 ==========");
    return {
      isError: false,
      message: "회사정보를 가져왔습니다.",
      data,
    };
  } catch (error) {
    console.error("========== getCompanyInfoAction 실패 ==========");
    console.error("error:", error);

    if (error instanceof ApiError) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

// export async function getCompanyInfoAction() {
//   console.log("🔵 1. getCompanyInfoAction 실행됨");

//   try {
//     console.log("🔵 2. getCompanyInfo 호출 직전");

//     const data = await getCompanyInfo();

//     console.log("🟢 3. getCompanyInfo 결과:", data);

//     return {
//       isError: false,
//       message: "회사정보를 가져왔습니다.",
//       data,
//     };
//   } catch (error) {
//     console.log("🔴 3. getCompanyInfo에서 오류 발생");

//     if (error instanceof Error) {
//       console.log("오류 이름:", error.name);
//       console.log("오류 메시지:", error.message);
//       console.log("오류 스택:", error.stack);

//       throw new Error(error.message);
//     }

//     console.log("알 수 없는 오류:", String(error));

//     throw new Error("알 수 없는 오류가 발생했습니다.");
//   }
// }
