"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signupAction } from "@/app/action/auth.action";
import type { SignupRequest } from "@/apis/auth";

export function useSignup() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: SignupRequest) => {
      const result = await signupAction(payload);

      if (result.isError) {
        throw result;
      }
      return result;
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.log("회원가입 실패", error);
      alert("회원가입실패");
    },
  });
}
