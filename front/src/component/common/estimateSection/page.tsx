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
      <div className="flex w-full gap-4 mb-4">
        <EstimateSearch
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <Link href={user ? "/estimate" : "/login"}>
          <Button className="flex items-center gap-2">
            <span className="text-2xl">+</span>
            <span className="text-lg">새 견적서 만들기</span>
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
