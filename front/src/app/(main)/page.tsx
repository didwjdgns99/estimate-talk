import TopCard from "@/component/common/topcard/TopCard";
import { FileText, Calendar, TrendingUp } from "lucide-react";
import Input from "@/component/common/Input";
import Button from "@/component/common/button/button";
import search from "@/public/search.svg";
import Image from "next/image";
import BotCard from "@/component/common/botcard/BotCard";
import Link from "next/link";

const estimateList = [
  {
    id: 1,
    companyName: "주식회사 ABC",
    title: "홈페이지 제작 견적서",
    price: "1,200만원",
    date: "2026.06.13",
  },
  {
    id: 2,
    companyName: "홍길동 컴퍼니",
    title: "쇼핑몰 구축 견적서",
    price: "2,800만원",
    date: "2026.06.10",
  },
  {
    id: 3,
    companyName: "테스트 상사",
    title: "랜딩페이지 제작 견적서",
    price: "800만원",
    date: "2026.06.01",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-main-text">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold">견적서 관리</h1>
        <p className="mt-3 text-secondary-text tracking-wider">
          전체 견적서를 관리하고 새로운 견적서를 작성하세요
        </p>
      </section>
      <section className="flex justify-space-between w-full mx-auto max-w-6xl px-6 py-10 gap-4">
        <TopCard
          className="flex-1"
          title="전체 견적서"
          value="3"
          icon={<FileText className="text-primary" size={22} />}
        />
        <TopCard
          className="flex-1"
          title="이번달"
          value="2"
          icon={<Calendar className="text-primary" size={22} />}
        />
        <TopCard
          className="flex-1"
          title="이번달 금액"
          value="4,800만원"
          icon={<TrendingUp className="text-primary" size={22} />}
        />
      </section>
      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex w-full gap-4 mb-4">
            <div className="relative flex-1">
              <Image
                src={search}
                alt="검색 아이콘"
                width={25}
                height={25}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              />

              <Input
                className="pl-14 text-lg"
                placeholder="상호명으로 검색..."
              />
            </div>
            <Link href="/estimate">
              <Button className="flex items-center gap-2">
                <span className="text-2xl">+</span>
                <span className="text-lg">새 견적서 만들기</span>
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {estimateList.map((estimate) => (
              <BotCard
                key={estimate.id}
                estimateCompany={estimate.companyName}
                estimateTitle={estimate.title}
                estimagePrice={estimate.price}
                estimateDate={estimate.date}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
