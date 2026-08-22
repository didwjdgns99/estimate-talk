import { createEstimateAction } from "@/app/action/estimate.action";
import { useMutation } from "@tanstack/react-query";

export function useCreateEstimate() {
  return useMutation({
    mutationFn: createEstimateAction,
  });
}
