"use client";

import { useState, useEffect } from "react";
import Input from "@/component/common/Input";
import search from "@/public/search.svg";
import Image from "next/image";
import Button from "@/component/common/button/button";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  useCreateCompanyInfo,
  useGetCompanyInfo,
  useCheckBusinessStatus,
} from "@/app/hook/info/useCompanyInfo";
import { useRouter } from "next/navigation";

export default function CompanyInfo() {
  const router = useRouter();

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

  const [stampFile, setStampFile] = useState<File | null>(null);
  const [stampPreview, setStampPreview] = useState<string | null>(null);

  const { mutate, isPending } = useCreateCompanyInfo();
  const { data: companyInfoData, isLoading, isError } = useGetCompanyInfo();
  const { mutate: checkBusinessStatus, isPending: isCheckingBusinessStatus } =
    useCheckBusinessStatus();

  console.log({
    companyInfoData,
    isLoading,
    isError,
  });

  useEffect(() => {
    const companyInfo = companyInfoData?.data?.data;

    if (!companyInfo) return;

    setForm({
      companyName: companyInfo.companyName ?? "",
      businessNumber: companyInfo.businessNumber ?? "",
      ceoName: companyInfo.ceoName ?? "",
      businessType: companyInfo.businessType ?? "",
      businessItem: companyInfo.businessItem ?? "",
      manager: companyInfo.manager ?? "",
      phone: companyInfo.phone ?? "",
      fax: companyInfo.fax ?? "",
      mobile: companyInfo.mobile ?? "",
      email: companyInfo.email ?? "",
      zipCode: companyInfo.zipCode ?? "",
      address: companyInfo.address ?? "",
      detailAddress: companyInfo.detailAddress ?? "",
    });

    setStampPreview(companyInfo.stampUrl ?? null);
  }, [companyInfoData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      formData.append(key, String(value));
    });

    if (stampFile) {
      formData.append("stamp", stampFile);
    }

    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        alert("회사정보가 저장되었습니다.");

        router.push("/");
      },

      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const handleCheckBusinessStatus = () => {
    if (!form.businessNumber) {
      alert("사업자등록번호를 입력하세요.");
      return;
    }
    checkBusinessStatus(form.businessNumber, {
      onSuccess: (data) => {
        alert(data.data.message);
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const open = useDaumPostcodePopup();

  const isCompanyNameValid = form.companyName.trim() !== "";
  const isBusinessNumberValid = /^[0-9]{10}$/.test(
    form.businessNumber.replaceAll("-", ""),
  ); //사업자에서 하이픈을 빈 문자열로 바꿔라
  const isCeoNameValid = form.ceoName.trim() !== "";
  const isBusinessTypeValid = form.businessType.trim() !== "";
  const isBusinessItemValid = form.businessItem.trim() !== "";
  const isManagerValid = form.manager.trim() !== "";
  const isPhoneValid = /^[0-9]+$/.test(form.phone.replaceAll("-", "")); //+를 넣으면 0-9다음으로 1개 이상 있어야 한다 즉 없으면 안된다.
  const isMobileValid = /^[0-9]+$/.test(form.mobile.replaceAll("-", ""));
  //이메일검사
  //대소문자+숫자+일부 특수문자 사용 + @ + 도메인에 (대소문자,숫자, .- 만 가능) + \.(온점 확인) 최소 2글자 이상 대소문자 가능
  const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    form.email,
  );
  const iszipCodeValid = /^[0-9]{5}$/.test(form.zipCode);
  const isAddressValid = form.address.trim() !== "";
  const isDetailAddressValid = form.detailAddress.trim() !== "";

  const isFormValid =
    isCompanyNameValid &&
    isBusinessNumberValid &&
    isCeoNameValid &&
    isBusinessTypeValid &&
    isBusinessItemValid &&
    isManagerValid &&
    isPhoneValid &&
    isMobileValid &&
    isEmailValid &&
    isDetailAddressValid;

  const handleAddressSearch = () => {
    open({
      onComplete: (data) => {
        setForm((prev) => ({
          ...prev,
          zipCode: data.zonecode,
          address: data.address,
        }));
      },
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleStampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStampFile(file);
    setStampPreview(URL.createObjectURL(file));
  };

  if (isLoading) return <div>회사정보를 불러오는 중입니다.</div>;
  if (isError) return <div>회사정보를 불러오는 중에 오류가 발생했습니다.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-[640px] m-auto">
      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-2 px-4 py-6 bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:border-primary transition">
          <Input
            label="상호명 *"
            placeholder="(주)견적톡"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            name="companyName"
            onBlur={handleBlur}
            errorMessage={
              touched.companyName && !isCompanyNameValid
                ? "상호명을 입력하세요."
                : ""
            }
          />
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                label="사업자번호 *"
                placeholder="123-45-67890"
                value={form.businessNumber}
                onChange={(e) =>
                  setForm({ ...form, businessNumber: e.target.value })
                }
                name="businessNumber"
                onBlur={handleBlur}
                errorMessage={
                  touched.businessNumber && !isBusinessNumberValid
                    ? "사업자번호를 입력하세요."
                    : ""
                }
              />
            </div>

            <button
              type="button"
              disabled={!isBusinessNumberValid}
              onClick={() => checkBusinessStatus(form.businessNumber)}
              className="
      h-12
      shrink-0
      rounded-lg
      border
      border-primary
      px-4
      text-sm
      font-medium
      text-primary
      transition
      hover:bg-primary/10
      disabled:cursor-not-allowed
      disabled:border-gray-200
      disabled:text-gray-300
    "
            >
              사업자 확인
            </button>
          </div>
          <Input
            label="대표자 *"
            placeholder="홍길동"
            value={form.ceoName}
            onChange={(e) => setForm({ ...form, ceoName: e.target.value })}
            name="ceoName"
            onBlur={handleBlur}
            errorMessage={
              touched.ceoName && !isCeoNameValid ? "대표자를 입력하세요." : ""
            }
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-6 bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:border-primary transition">
          <Input
            label="업태 *"
            placeholder="도소매"
            value={form.businessType}
            onChange={(e) =>
              setForm({
                ...form,
                businessType: e.target.value,
              })
            }
            name="businessType"
            onBlur={handleBlur}
            errorMessage={
              touched.businessType && !isBusinessTypeValid
                ? "업태를 입력하세요."
                : ""
            }
          />
          <Input
            label="종목 *"
            placeholder="화훼"
            value={form.businessItem}
            onChange={(e) =>
              setForm({
                ...form,
                businessItem: e.target.value,
              })
            }
            name="businessItem"
            onBlur={handleBlur}
            errorMessage={
              touched.businessItem && !isBusinessItemValid
                ? "종목을 입력하세요."
                : ""
            }
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-6 bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:border-primary transition">
          <Input
            label="담당자 *"
            value={form.manager}
            onChange={(e) =>
              setForm({
                ...form,
                manager: e.target.value,
              })
            }
            name="manager"
            onBlur={handleBlur}
            errorMessage={
              touched.manager && !isManagerValid ? "담당자를 입력하세요." : ""
            }
          />
          <Input
            label="전화 *"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value.replace(/[^0-9-]/g, ""), // 숫자아니면 못 쓰게하기
              })
            }
            name="phone"
            onBlur={handleBlur}
            errorMessage={
              touched.phone && !isPhoneValid ? "전화번호를 입력하세요." : ""
            }
          />
          <Input
            label="팩스 "
            value={form.fax}
            onChange={(e) =>
              setForm({
                ...form,
                fax: e.target.value.replace(/[^0-9-]/g, ""),
              })
            }
          />
          <Input
            label="핸드폰 *"
            value={form.mobile}
            onChange={(e) =>
              setForm({
                ...form,
                mobile: e.target.value.replace(/[^0-9-]/g, ""),
              })
            }
            name="mobile"
            onBlur={handleBlur}
            errorMessage={
              touched.mobile && !isMobileValid ? "핸드폰번호를 입력하세요." : ""
            }
          />
          <Input
            label="이메일 *"
            value={form.email}
            onBlur={handleBlur}
            name="email"
            errorMessage={
              touched.email && !isEmailValid
                ? "이메일 형식이 올바르지 않습니다."
                : ""
            }
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-6 bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:border-primary transition">
          <div className="relative">
            <Input
              label="우편번호 *"
              placeholder="01234"
              value={form.zipCode}
              onChange={(e) =>
                setForm({
                  ...form,
                  zipCode: e.target.value.replace(/[^0-9]/g, ""),
                })
              }
            />
            <Image
              className="absolute top-[38px] right-4"
              src={search}
              alt="돋보기"
              width={20}
              height={20}
            />
          </div>
          <Input
            label="주소 *"
            helperText="클릭하여 주소를 검색하세요"
            className="cursor-pointer"
            placeholder="서울특별시 강남구 테헤란로 123"
            value={form.address}
            onClick={handleAddressSearch}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />
          <Input
            label="상세주소 *"
            placeholder="상세주소를 적어주세요."
            value={form.detailAddress}
            onChange={(e) =>
              setForm({
                ...form,
                detailAddress: e.target.value,
              })
            }
            name="detailAddress"
            onBlur={handleBlur}
            errorMessage={
              touched.detailAddress && !isDetailAddressValid
                ? "상세주소를 입력하세요."
                : ""
            }
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-6 bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:border-primary transition mb-10">
          <label className="mb-2 block text-sm font-medium text-main-text">
            회사 직인
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleStampChange}
            className="block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-main-text"
          />

          {stampPreview && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-secondary-text">미리보기</p>
              <img
                src={stampPreview}
                alt="회사 직인 미리보기"
                className="h-32 w-32 rounded-lg border border-border object-contain"
              />
            </div>
          )}
        </div>
      </div>
      <div className="px-4 mb-10">
        <Button
          type="submit"
          className="w-full"
          variant="primary"
          children="저장하고 시작하기"
          disabled={!isFormValid || isPending}
        />
      </div>
    </form>
  );
}
