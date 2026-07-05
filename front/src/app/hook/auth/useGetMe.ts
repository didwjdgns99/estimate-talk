"use client";

import { useQuery } from "@tanstack/react-query";
import { getMeAction } from "@/app/action/getMe.action";

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const result = await getMeAction();

      if (result.isError) {
        throw new Error(result.message);
      }

      return result;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
