"use client";

import type { EstimateItem } from "@/apis/Esimate";
import BotCard from "@/component/common/botcard/BotCard";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type Estimate = {
  _id: string;
  title: string;
  customer: string;
  taxType: "taxable" | "taxFree";
  items: EstimateItem[];
  createdAt: string;
};

type EstimateListProps = {
  user: { id: string } | null;
  estimateList: Estimate[];
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
};

export default function EstimateList({
  user,
  estimateList,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  onLoadMore,
}: EstimateListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const root = scrollRef.current;
    const target = bottomRef.current;

    if (!user || !root || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!hasNextPage || isFetching) return;

        onLoadMore();
      },
      {
        root,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [user?.id, hasNextPage, isFetching, onLoadMore]);

  const onClickEstimate = (estimateId: string) => {
    router.push(`/estimateDetail/${estimateId}`);
  };

  // BotCard에서 삭제에 성공한 후 실행
  const handleDeleted = (_estimateId: string) => {
    void queryClient.invalidateQueries({
      queryKey: ["estimate"],
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-4 max-h-90 overflow-y-auto"
    >
      {estimateList.map((estimate) => {
        const supplyPrice = estimate.items.reduce(
          (sum, item) => sum + item.quantity * item.unitPrice,
          0,
        );

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
            estimateId={estimate._id}
            onClick={() => onClickEstimate(estimate._id)}
            onDeleted={handleDeleted}
            estimateCompany={estimate.customer}
            estimateTitle={estimate.title}
            estimagePrice={`${totalPrice.toLocaleString()}원`}
            estimateDate={new Date(estimate.createdAt).toLocaleDateString(
              "ko-KR",
            )}
          />
        );
      })}

      {isFetchingNextPage && (
        <p className="text-center text-sm text-secondary-text">
          견적서를 불러오고 있습니다...
        </p>
      )}

      <div ref={bottomRef} className="h-px shrink-0" />
    </div>
  );
}
