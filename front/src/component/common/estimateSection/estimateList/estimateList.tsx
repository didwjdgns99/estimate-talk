"use client";

import { EstimateItem } from "@/apis/Esimate";
import BotCard from "@/component/common/botcard/BotCard";
import { useState, useRef, useEffect } from "react";
import { getEstimateAction } from "@/app/action/estimate.action";
import { useRouter } from "next/navigation";

type Estimate = {
  _id: string;
  title: string;
  customer: string;
  taxType: "taxable" | "taxFree";
  items: EstimateItem[];
  createdAt: string;
};

type EstimateListProps = {
  user: {
    id: string;
  } | null;

  initialEstimateList: Estimate[];
  debouncedSearchKeyword: string;
};

export default function EstimateList({
  user,
  initialEstimateList,
  debouncedSearchKeyword,
}: EstimateListProps) {
  const [estimateList, setEstimateList] = useState(initialEstimateList);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialEstimateList.length === 3);
  const [page, setPage] = useState(1);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  //  추후
  // 검색어가 변경되면 1페이지부터 다시 조회
  const isFirstRender = useRef(true);
  const loadingRef = useRef(false);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchSearchEstimate = async () => {
      try {
        loadingRef.current = true;
        setIsLoading(true);

        // 검색 결과는 항상 1페이지부터 시작
        const result = await getEstimateAction(1, 3, debouncedSearchKeyword);

        const searchEstimateList = result?.data?.estimateList ?? [];

        // 기존 리스트에 추가하는 게 아니라 검색 결과로 교체
        setEstimateList(searchEstimateList);

        // 페이지네이션 상태 초기화
        setPage(1);
        setHasMore(searchEstimateList.length === 3);

        // 검색할 때 스크롤 위치도 맨 위로
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      } catch (error) {
        console.error("견적서 검색 실패", error);
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
      }
    };

    fetchSearchEstimate();
  }, [debouncedSearchKeyword]);

  useEffect(() => {
    const root = scrollRef.current;
    const target = bottomRef.current;

    if (!root || !target) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        if (loadingRef.current) return;
        if (!hasMore) return;

        try {
          loadingRef.current = true;
          setIsLoading(true);

          const nextPage = page + 1;

          const result = await getEstimateAction(
            nextPage,
            3,
            debouncedSearchKeyword,
          );

          const nextEstimateList = result?.data?.estimateList ?? [];

          if (nextEstimateList.length === 0) {
            setHasMore(false);
            return;
          }

          setEstimateList((prev) => {
            const merged = [...prev, ...nextEstimateList];

            return Array.from(
              new Map(
                merged.map((estimate) => [estimate._id, estimate]),
              ).values(),
            );
          });

          setPage(nextPage);

          // 3개보다 적게 왔다면 마지막 페이지
          if (nextEstimateList.length < 3) {
            setHasMore(false);
          }
        } catch (error) {
          console.error("견적서 추가 조회 실패", error);
        } finally {
          loadingRef.current = false;
          setIsLoading(false);
        }
      },
      {
        root,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [page, hasMore, debouncedSearchKeyword]);

  if (!user) {
    return null;
  }

  const onClickEstimate = (estimateId: string) => {
    router.push(`/estimateDetail/${estimateId}`);
  };

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-4 max-h-90 overflow-y-auto"
    >
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
            onClick={() => onClickEstimate(estimate._id)}
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
      <div ref={bottomRef}></div>
    </div>
  );
}
