import { http } from "@/lib/http";

export type CompanyInfo = {
  companyName: string;
  businessNumber: string;
  ceoName: string;
  businessType: string;
  businessItem: string;
  manager: string;
  phone: string;
  fax?: string;
  mobile: string;
  email: string;
  zipCode: string;
  address: string;
  detailAddress: string;
};

export interface CreateCompanyInfo extends CompanyInfo {
  stamp?: File | null;
}

export function createCompanyInfo(formData: FormData) {
  const result = http("/api/companyInfo", {
    method: "POST",
    body: formData,
  });
  return result;
}
