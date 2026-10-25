import { useState } from "react";

type CompanyInfoValidationOptions = {
  initialBusinessNumber: string;
  isSuccessBusinessStatus: boolean;
  stampFile: File | null;
  stampPreview: string | null;
};

export function useCompanyInfo(options: CompanyInfoValidationOptions) {
  const [form, setForm] = useState({
    companyName: "",
    businessNumber: "",
    ceoName: "",
    businessType: "",
    businessItem: "",
    manager: "",
    phone: "",
    fax: "",
    mobile: "",
    email: "",
    zipCode: "", //우편번호
    address: "",
    detailAddress: "",
  });

  const [touched, setTouched] = useState({
    companyName: false,
    businessNumber: false,
    ceoName: false,
    businessType: false,
    businessItem: false,
    manager: false,
    phone: false,
    mobile: false,
    email: false,
    zipCode: false,
    address: false,
    detailAddress: false,
  });

  //form에 있는 key값을 filed로 받아서 value를 바꿔주는 함수
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isCompanyNameValid = form.companyName.trim().length > 0;
  const isBusinessNumberValid = /^[0-9]{10}$/.test(
    form.businessNumber.replaceAll("-", ""),
  );
  const isBusinessNumberStatusValid =
    options.isSuccessBusinessStatus ||
    form.businessNumber === options.initialBusinessNumber;
  const isCeoNameValid = form.ceoName.trim().length > 0;
  const isBusinessTypeValid = form.businessType.trim().length > 0;
  const isBusinessItemValid = form.businessItem.trim().length > 0;
  const isManagerValid = form.manager.trim().length > 0;
  const isPhoneValid = /^[0-9]+$/.test(form.phone.replaceAll("-", ""));
  const isMobileValid = /^[0-9]+$/.test(form.mobile.replaceAll("-", ""));
  const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    form.email,
  );
  const isDetailAddressValid = form.detailAddress.trim().length > 0;
  const isStampValid = !!options.stampFile || !!options.stampPreview;
  const isFormValid =
    isCompanyNameValid &&
    isBusinessNumberValid &&
    isBusinessNumberStatusValid &&
    isCeoNameValid &&
    isBusinessTypeValid &&
    isBusinessItemValid &&
    isManagerValid &&
    isPhoneValid &&
    isMobileValid &&
    isEmailValid &&
    isDetailAddressValid &&
    isStampValid;

  //입력칸에서 빠져나갔느지
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  return {
    isCompanyNameValid,
    isBusinessNumberValid,
    isBusinessNumberStatusValid,
    isCeoNameValid,
    isBusinessTypeValid,
    isBusinessItemValid,
    isManagerValid,
    isPhoneValid,
    isMobileValid,
    isEmailValid,
    isDetailAddressValid,
    isStampValid,
    isFormValid,
    form,
    setForm,
    touched,
    handleBlur,
    handleChange,
  };
}
