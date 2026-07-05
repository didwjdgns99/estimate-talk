"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/action/login.action";
import type { LoginRequest } from "@/apis/auth";

/**
 *
 * @returns sonner 사용해서 toast 띄우기
 */
export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const result = await loginAction(payload);

      if (result.isError) {
        throw result;
      }
      return result;
    },
    onSuccess: () => {
      router.push("/main");
    },
    onError: (error) => {
      console.log("로그인 실패", error);
      alert("로그인실패");
    },
  });
}
