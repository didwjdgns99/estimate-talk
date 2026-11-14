"use client";

import EstimateSearch from "./estimateSearch/search";
import EstimateList from "./estimateList/estimateList";
import Link from "next/link";
import Button from "@/component/common/button/button";
import { useUser } from "@/context/userContext";
import type { Dispatch, SetStateAction } from "react";
import type { EstimateItem } from "@/apis/Esimate";

type Estimate = {
  _id: string;
  title: string;
  customer: string;
  taxType: "taxable" | "taxFree";
  items: EstimateItem[];
  createdAt: string;
};

type EstimateSectionProps = {
  estimateList: Estimate[];
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
};

export default function EstimateSection({
  estimateList,
  searchKeyword,
  setSearchKeyword,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  onLoadMore,
}: EstimateSectionProps) {
  const { user: currentUser, isPending } = useUser();

  if (isPending) {
    return <div>로그인 정보를 확인하고 있습니다...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex md:flex-row w-full gap-4 mb-4">
        <div className="order-2 md:order-1 md:flex-1">
          <EstimateSearch
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        </div>

        <Link
          href={currentUser ? "/estimate" : "/login"}
          className="order-1 md:order-2"
        >
          <Button className="w-full flex md:flex-1 items-center gap-2">
            <span className="text-xl md:text-2xl">+</span>
            <span className="text-sm md:text-lg">새 견적서 만들기</span>
          </Button>
        </Link>
      </div>

      <EstimateList
        user={currentUser}
        estimateList={estimateList}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={onLoadMore}
      />
    </div>
  );
}
