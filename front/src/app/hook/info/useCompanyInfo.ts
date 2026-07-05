"use client";

import { useMutation } from "@tanstack/react-query";
import { createCompanyInfoAction } from "@/app/action/companyInfo.action";

export function useCreateCompanyInfo() {
  return useMutation({
    mutationFn: (formData: FormData) => createCompanyInfoAction(formData),
  });
}
