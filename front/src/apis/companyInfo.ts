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
  const result = http(
    "/api/info",
    {
      method: "POST",
      body: formData,
    },
    {
      authRequired: true,
    },
  );
  console.log("createCompanyInfo result", result);
  return result;
}

export async function getCompanyInfo() {
  const result = await http(
    "/api/info",
    {
      method: "GET",
      credentials: "include",
    },
    {
      authRequired: true,
    },
  );
  console.log("getCompanyInfo result", result);
  return result;
}
