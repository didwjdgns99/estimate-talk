import Image from "next/image";
import Logo from "@/public/LOGO_2.png";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center px-4 py-2 mx-auto max-w-6xl">
        <Image src={Logo} alt="로고 이미지" width={120} height={60} />
        <div className="flex gap-4">
          {/* 회사 정보 나중에 LINK로 경로이동 추가0*/}
          <span className="cursor-pointer hover:text-primary transition">
            회사정보
          </span>
          {/* user가 있으면 로그아웃 없으면 로그인*/}
          <Link href="/login">
            <span className="cursor-pointer hover:text-primary transition">
              로그인
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
