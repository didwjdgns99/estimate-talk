"use client"

import Image from "next/image";
import Logo from "@/public/LOGO_2.png";
import Link from "next/link";
import {useUser} from "@/context/userContext"

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserProps = {
  user: User | null;
};

export default function Header() {

 const { user } = useUser();

  return (
    <div className="w-full border-b border-gray-200 bg-white mb-10">
      <div className="flex justify-between items-center px-4 py-2 mx-auto max-w-6xl">
        <Link href="/">
          <Image src={Logo} alt="로고 이미지" width={120} height={60} />
        </Link>

        <div className="flex gap-6 items-center">
          <Link href={user ? "/info" : "/login"}>
            <span className="cursor-pointer hover:text-primary transition text-sm sm:text-[16px]">
              회사정보
            </span>
          </Link>

          {user ? (
            <>
              <span className="text-main-text text-sm sm:text-[16px]">
                <span className="text-primary">{user.name}님</span> 반갑습니다
              </span>

              <button className="cursor-pointer hover:text-primary transition text-sm sm:text-[16px]">
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login">
              <span className="cursor-pointer hover:text-primary transition text-sm sm:text-[16px]">
                로그인
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
