import EstimateDetailButton from "@/app/(main)/estimateDetail/[estimateId]/EstimateDetailButton";

export type EstimateItem = {
  _id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
};

type EstimateProps = {
  items: EstimateItem[];
  taxType: "taxable" | "taxFree";
};

export default function EstimateContent({ items, taxType }: EstimateProps) {
  return (
    <section>
      <div className="mb-10  border-b border-foreground items-end">
        <div className="flex justify-between">
          <span className="mb-4">견적 내역</span>

          <span className="mb-4 text-sm md:text-[16px]">
            {taxType === "taxable"
              ? "* 할인이 적용된 항목이 있습니다"
              : "할인 적용이 없는 견적서 입니다"}
          </span>
        </div>
        <div className="flex justify-end">
          <EstimateDetailButton />
        </div>
      </div>
      <div></div>
      <div className="w-full">
        {/* 451px 이상 header */}
        <div className="grid grid-cols-[2fr_0.5fr_1fr_0.7fr_1fr] border-b border-gray-200 pb-3 text-sm text-gray-500 max-[450px]:hidden">
          <span>품목</span>
          <span className="text-center">수량</span>
          <span className="text-right">단가</span>
          <span className="text-center">할인</span>
          <span className="text-right">공급가</span>
        </div>

        {items.map((item) => {
          const originalPrice = item.quantity * item.unitPrice;
          const discountPrice = originalPrice * (item.discountRate / 100);
          const finalPrice = originalPrice - discountPrice;

          const hasDiscount = item.discountRate > 0;

          return (
            <div
              key={item._id}
              className="
                grid
                grid-cols-[2fr_0.5fr_1fr_0.7fr_1fr]
                items-center
                border-b
                border-gray-100
                py-5

                max-[450px]:flex
                max-[450px]:flex-col
                max-[450px]:items-stretch
                max-[450px]:gap-4
              "
            >
              {/* 품목 */}
              <div className="min-w-0 max-[450px]:w-full">
                <span className="break-words font-semibold text-gray-900">
                  {item.description}
                </span>
              </div>

              {/* 450px 이하 나머지 정보 */}
              <div className="contents max-[450px]:grid max-[450px]:grid-cols-4 max-[450px]:items-start max-[450px]:gap-2">
                {/* 수량 */}
                <div className="text-center">
                  <span className="hidden text-xs text-gray-400 max-[450px]:mb-1 max-[450px]:block">
                    수량
                  </span>

                  <span className="text-sm text-gray-500">{item.quantity}</span>
                </div>

                {/* 단가 */}
                <div className="text-right">
                  <span className="hidden text-xs text-gray-400 max-[450px]:mb-1 max-[450px]:block">
                    단가
                  </span>

                  <span
                    className={`text-sm ${
                      hasDiscount
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {item.unitPrice.toLocaleString()}원
                  </span>
                </div>

                {/* 할인 */}
                <div className="flex flex-col items-center">
                  <span className="hidden text-xs text-gray-400 max-[450px]:mb-1 max-[450px]:block">
                    할인
                  </span>

                  {hasDiscount ? (
                    <span className="rounded-full bg-red-50 px-2 py-1 text-xs text-red-500">
                      -{item.discountRate}%
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>

                {/* 공급가 */}
                <div className="text-right">
                  <span className="hidden text-xs text-gray-400 max-[450px]:mb-1 max-[450px]:block">
                    공급가
                  </span>

                  <p className="text-sm font-bold text-gray-900 md:text-[16px]">
                    {finalPrice.toLocaleString()}원
                  </p>

                  {hasDiscount && (
                    <p className="mt-1 text-xs text-red-500">
                      -{discountPrice.toLocaleString()}원 절약
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
