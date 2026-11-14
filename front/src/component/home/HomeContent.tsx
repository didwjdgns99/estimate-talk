"use client";

import TopCard from "@/component/common/topcard/TopCard";
import { FileText, Calendar, TrendingUp } from "lucide-react";
import { useGetInfiniteEstimate } from "@/app/hook/estimate/useGetEstimate";
import { EstimateItem } from "@/apis/Esimate";
import EstimateSection from "@/component/common/estimateSection/page";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import useDebounce from "@/app/hook/useDebounce/useDebounce";

type Estimate = {
  _id: string;
  title: string;
  customer: string;
  taxType: "taxable" | "taxFree";
  items: EstimateItem[];
  createdAt: string;
};

export default function HomeContent() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { user, isPending } = useUser();

  const debouncedSearchKeyword = useDebounce({
    value: searchKeyword,
    delay: 500,
  });

  const {
    data: estimateResult,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetInfiniteEstimate(!!user, debouncedSearchKeyword);

  const estimateList: Estimate[] =
    estimateResult?.pages.flatMap((page) => page?.data?.estimateList ?? []) ??
    [];
  console.log("estimateResult", estimateResult);
  const firstPage = estimateResult?.pages[0];

  const estimateLength = firstPage?.data?.totalCount ?? 0;

  const thisMonthEstimateList = firstPage?.data?.thisMonthCount ?? 0;

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

  return (
    <main className="min-h-screen bg-background text-main-text">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-xl  md:text-4xl font-bold">견적서 관리</h1>
        <p className="text-sm md:text-4 mt-3 text-secondary-text tracking-wider">
          전체 견적서를 관리하고 새로운 견적서를 작성하세요
        </p>
        {!isPending && !user && (
          <button
            type="button"
            onClick={() => window.location.assign("/demo")}
            className="mt-5 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            로그인 없이 데모 체험하기
          </button>
        )}
      </section>
      <section className="flex flex-col md:flex md:flex-row justify-space-between w-full mx-auto max-w-6xl px-6 py-10 gap-4">
        <TopCard
          className="flex-1"
          title="전체 견적서"
          value={estimateLength}
          icon={<FileText className="text-primary" size={22} />}
        />
        <TopCard
          className="flex-1"
          title="이번달"
          value={thisMonthEstimateList}
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
          <EstimateSection
            estimateList={estimateList}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={() => {
              if (hasNextPage && !isFetching) {
                void fetchNextPage();
              }
            }}
          />
        </div>
      </section>
    </main>
  );
}
