"use client";

import Image from "next/image";
import Logo from "@/public/LOGO_2.png";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import logoutAction from "@/app/action/logout.action";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export type User = {
  id: string;
  name: string;
  email: string;
  isDemo?: boolean;
};

export type UserProps = {
  user: User | null;
};

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const result = await logoutAction();
    if (result?.isError) return;

    queryClient.setQueryData(["me"], { isError: false, user: null });
    queryClient.removeQueries({ queryKey: ["estimate"] });
    queryClient.removeQueries({ queryKey: ["estimateDetail"] });
    queryClient.removeQueries({ queryKey: ["companyInfo"] });
    router.push("/");
    router.refresh();
  };
  return (
    <div className="w-full border-b border-gray-200 bg-white mb-10 print:hidden">
      <div className="flex justify-between items-center px-4 py-2 mx-auto max-w-6xl">
        <Link href="/">
          <Image
            src={Logo}
            alt="로고 이미지"
            width={120}
            height={60}
            className="w-22.5 sm:w-30 h-auto"
          />
        </Link>

        <div className="flex gap-6 items-center">
          <Link href={user ? "/info" : "/login"}>
            <span className="cursor-pointer hover:text-primary transition text-xs sm:text-[16px]">
              회사정보
            </span>
          </Link>

          {user ? (
            <>
              <span className="text-main-text text-xs sm:text-[16px]">
                {user.isDemo ? (
                  <span className="text-primary">데모 이용 중</span>
                ) : (
                  <>
                    <span className="text-primary">{user.name}님</span>{" "}
                    반갑습니다
                  </>
                )}
              </span>

              <button
                onClick={handleLogout}
                className="cursor-pointer hover:text-primary transition text-xs sm:text-[16px]"
              >
                {user.isDemo ? "데모 종료" : "로그아웃"}
              </button>
            </>
          ) : (
            <Link href="/login">
              <span className="cursor-pointer hover:text-primary transition text-xs sm:text-[16px]">
                로그인
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
