"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/action/login.action";
import type { LoginRequest } from "@/apis/auth";
import { toast } from "sonner";

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
      router.push("/");
      toast.success("로그인 성공", { duration: 2000 });
    },
    onError: (error) => {
      toast.error("로그인 실패", { duration: 2000 });
    },
  });
}
