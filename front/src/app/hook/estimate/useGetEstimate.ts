"use client";

import { useQuery } from "@tanstack/react-query";
import { getEstimateAction } from "@/app/action/estimate.action";

export function useGetEstimate(enabled: boolean) {
  return useQuery({
    queryKey: ["estimate", 1, 3],

    queryFn: () => getEstimateAction(),
    enabled,
    staleTime: 1000 * 60,
  });
}
