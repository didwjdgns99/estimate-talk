"use client";

import { useQuery } from "@tanstack/react-query";
import { getEstimateAction } from "@/app/action/estimate.action";

export function useGetEstimate() {
  return useQuery({
    queryKey: ["estimate"],

    queryFn: () => getEstimateAction(),
  });
}
