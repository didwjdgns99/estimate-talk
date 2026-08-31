import TopCard from "@/component/common/topcard/TopCard";
import { FileText, Calendar, TrendingUp } from "lucide-react";
import Input from "@/component/common/Input";
import Button from "@/component/common/button/button";
import search from "@/public/search.svg";
import Image from "next/image";
import BotCard from "@/component/common/botcard/BotCard";
import Link from "next/link";
import { getMeAction } from "../action/getMe.action";
import { getEstimateAction } from "@/app/action/estimate.action";
import { EstimateItem } from "@/apis/Esimate";

type Estimate = {
  _id: string;
  title: string;
  customer: string;
  taxType: "taxable" | "taxFree";
  items: EstimateItem[];
  createdAt: string;
};

export default async function Home() {
  const result = await getMeAction();

  const user = result?.user;
  const estimateResult = user ? await getEstimateAction() : null;

  const estimateList: Estimate[] = estimateResult?.data?.estimateList ?? [];
  console.log("에스티메이트리스트", estimateList);

  const estimateLength = estimateList.length;

  const now = new Date();

  const thisMonthEstimateList = estimateList.filter((estimate) => {
    const createdAt = new Date(estimate.createdAt);

    return (
      createdAt.getFullYear() === now.getFullYear() &&
      createdAt.getMonth() === now.getMonth()
    );
  });

  const recentEstimate = estimateList[0];

  const recentPrice = recentEstimate
    ? recentEstimate.items.reduce((sum, item) => {
        const itemPrice = item.quantity * item.unitPrice;
        const discountPrice = itemPrice * (item.discountRate / 100);
        const afterDiscountPrice = itemPrice - discountPrice;

        const vat =
          recentEstimate.taxType === "taxable" ? afterDiscountPrice * 0.1 : 0;

        return sum + afterDiscountPrice + vat;
      }, 0)
    : 0;

  const thisMonthEstimateLength = thisMonthEstimateList.length;

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
          value={estimateLength}
          icon={<FileText className="text-primary" size={22} />}
        />
        <TopCard
          className="flex-1"
          title="이번달"
          value={thisMonthEstimateLength}
          icon={<Calendar className="text-primary" size={22} />}
        />
        <TopCard
          className="flex-1"
          title="최근 견적 금액"
          value={`${recentPrice.toLocaleString()}원`}
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
            <Link href={user ? "/estimate" : "/login"}>
              <Button className="flex items-center gap-2">
                <span className="text-2xl">+</span>
                <span className="text-lg">새 견적서 만들기</span>
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {estimateList.map((estimate) => {
              const supplyPrice = estimate.items.reduce((sum, item) => {
                return sum + item.quantity * item.unitPrice;
              }, 0);

              const discountPrice = estimate.items.reduce((sum, item) => {
                const itemPrice = item.quantity * item.unitPrice;
                return sum + itemPrice * (item.discountRate / 100);
              }, 0);

              const afterDiscountPrice = supplyPrice - discountPrice;

              const vat =
                estimate.taxType === "taxable" ? afterDiscountPrice * 0.1 : 0;

              const totalPrice = afterDiscountPrice + vat;

              return (
                <BotCard
                  key={estimate._id}
                  estimateCompany={estimate.customer}
                  estimateTitle={estimate.title}
                  estimagePrice={`${totalPrice.toLocaleString()}원`}
                  estimateDate={new Date(estimate.createdAt).toLocaleDateString(
                    "ko-KR",
                  )}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
