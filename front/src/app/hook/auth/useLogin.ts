"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/action/login.action";
import type { LoginRequest } from "@/apis/auth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

/**
 *
 * @returns sonner 사용해서 toast 띄우기
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const result = await loginAction(payload);

      if (result.isError) {
        throw result;
      }
      return result;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["me"], {
        isError: false,
        user: result.user,
      });
      queryClient.removeQueries({ queryKey: ["estimate"] });
      queryClient.removeQueries({ queryKey: ["estimateDetail"] });
      queryClient.removeQueries({ queryKey: ["companyInfo"] });
      router.push("/");
      router.refresh();
      toast.success("로그인 성공", { duration: 2000 });
    },
    onError: (error) => {
      toast.error("로그인 실패", { duration: 2000 });
    },
  });
}
