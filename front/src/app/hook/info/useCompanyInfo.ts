"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCompanyInfoAction,
  getCompanyInfoAction,
  checkBusinessStatusAction,
} from "@/app/action/companyInfo.action";

export function useCreateCompanyInfo() {
  return useMutation({
    mutationFn: (formData: FormData) => createCompanyInfoAction(formData),
  });
}

export function useGetCompanyInfo() {
  return useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfoAction,
    retry: false,
  });
}

export function useCheckBusinessStatus() {
  return useMutation({
    mutationFn: (businessNumber: string) =>
      checkBusinessStatusAction(businessNumber),
  });
}
