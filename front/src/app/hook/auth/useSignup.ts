"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signupAction } from "@/app/action/auth.action";
import type { SignupRequest } from "@/apis/auth";
import { toast } from "sonner";

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
      toast.success("회원가입 성공", { duration: 2000 });
    },
    onError: (error) => {
      toast.error("회원가입 실패", { duration: 2000 });
    },
  });
}
