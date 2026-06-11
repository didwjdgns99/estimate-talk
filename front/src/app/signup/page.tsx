"use client";

import Button from "@/component/common/button/button";
import Input from "@/component/common/Input";
import Logo from "@/public/LOGO_2.png";
import Image from "next/image";
import password_hide from "@/public/password_hide.svg";
import password_show from "@/public/password-show.svg";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    setIsEmailValid(emailValid.test(e.target.value));
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const clickPasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const nameValid = name.length > 0;
  const enValid = /[a-zA-Z]/.test(password);
  const numValid = /[0-9]/.test(password);
  const passwordValid = password.length >= 8;
  const confirmPasswordValid = password === confirmPassword;

  const isValid =
    nameValid &&
    isEmailValid &&
    enValid &&
    numValid &&
    passwordValid &&
    confirmPasswordValid;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-2">
        <Image src={Logo} alt="견적톡 로고" width={180} height={60} />
        {/* <h1 className="text-3xl font-bold text-gray-900">견적톡</h1> */}
        <span className="text-sm text-gray-500">
          간편하게 견적서를 관리하세요
        </span>
      </div>
      <div className="w-full max-w-[450px] bg-white border border-gray-200 rounded-xl px-6 py-6 sm:px-8 flex flex-col gap-4 mt-8">
        <form className="flex flex-col gap-4">
          <Input
            label="이름"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={onChangeName}
          />
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onChangeEmail}
          />
          <div className="relative">
            <Input
              label="비밀번호"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={onChangePassword}
            />
            <Image
              src={showPassword ? password_show : password_hide}
              alt="비밀번호 숨기기 보이기"
              onClick={clickPasswordToggle}
              width={20}
              height={20}
              className="absolute right-3 top-[67%] transform -translate-y-1/2 cursor-pointer"
            />
          </div>
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          <Button
            disabled={!isValid}
            className="mt-4 cursor-pointer"
            variant="primary"
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
