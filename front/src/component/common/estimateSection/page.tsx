"use client";

import EstimateSearch from "./estimateSearch/search";
import EstimateList from "./estimateList/estimateList";
import Link from "next/link";
import Button from "@/component/common/button/button";
import { useState } from "react";
import useDebounce from "@/app/hook/useDebounce/useDebounce";
export default function EstimateSection({
  user,
  estimateList,
}: {
  user: any;
  estimateList: any[];
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce({
    value: searchKeyword,
    delay: 500,
  });
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
          href={user ? "/estimate" : "/login"}
          className="order-1 md:order-2"
        >
          <Button className="w-full flex md:flex-1 items-center gap-2">
            <span className="text-xl md:text-2xl">+</span>
            <span className="text-sm md:text-lg">새 견적서 만들기</span>
          </Button>
        </Link>
      </div>
      <EstimateList
        user={user}
        initialEstimateList={estimateList}
        debouncedSearchKeyword={debouncedSearchKeyword}
      />
    </div>
  );
}
