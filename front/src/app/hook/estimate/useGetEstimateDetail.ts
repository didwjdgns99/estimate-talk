"use client";

import { useQuery } from "@tanstack/react-query";
import { getEstimateDetailAction } from "@/app/action/estimate.action";

export function useGetEstimateDetail(estimateId: string) {
  return useQuery({
    queryKey: ["estimateDetail", estimateId],

    queryFn: () => getEstimateDetailAction(estimateId),

    enabled: !!estimateId,
  });
}
