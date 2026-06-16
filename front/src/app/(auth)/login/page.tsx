import Input from "@/component/common/Input";
import Button from "@/component/common/button/button";
import Logo from "@/public/LOGO_2.png";
import Image from "next/image";

export default function LoginPage() {
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
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </form>
        <Button variant="primary">로그인</Button>
        <span className="text-sm font-light text-primary text-center cursor-pointer mt-3 hover:font-medium">
          아직 계정이 없으신가요? 회원가입
        </span>
      </div>
    </div>
  );
}
