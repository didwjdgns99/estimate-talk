"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getEstimateAction } from "@/app/action/estimate.action";

export function useGetInfiniteEstimate(
  enabled: boolean,
  searchKeyword: string,
) {
  return useInfiniteQuery({
    queryKey: ["estimate", "infinite", 3, searchKeyword], // 첫 마운트시 조회와 무한스크롤 조회를 구분하기 위해 queryKey에 infinite를 추가
    enabled, // !!user로 로그인 여부를 확인하고 요청
    initialPageParam: 1, //react-query v5부터는 initialPageParam을 사용하여 첫 페이지를 지정
    queryFn: ({ pageParam }) => getEstimateAction(pageParam, 3, searchKeyword),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      console.log("lastPage", lastPage);
      console.log("lastPageParam", lastPageParam);
      const estimateList = lastPage?.data?.estimateList ?? [];

      if (estimateList.length < 3) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
}
