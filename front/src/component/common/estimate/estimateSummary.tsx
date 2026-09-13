import { EstimateItem } from "@/component/common/estimate/estimateItem";
import { TaxTypeValue } from "@/component/common/estimate/estimateItem";

export default function EstimateSummary({
  items,
  taxType,
  hasDiscount,
}: {
  items: EstimateItem[];
  taxType: TaxTypeValue;

  hasDiscount: boolean;
}) {
  const totalOriginalPrice = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const totalDiscount = items.reduce(
    (sum, item) =>
      sum + (item.unitPrice * item.quantity * item.discountRate) / 100,
    0,
  );
  const afterDiscountPrice = totalOriginalPrice - totalDiscount;

  const includesTax = afterDiscountPrice * 1.1; // 부가세 10% 계산
  const vat = afterDiscountPrice * 0.1; // 부가세 10% 계산
  return (
    console.log("items목록", items),
    (
      <section className="flex flex-col w-full rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-2 mb-4">
          <h2 className="mb-2">금액 요약</h2>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">공급가 합계</span>
            <span>{totalOriginalPrice.toLocaleString()} 원</span>
          </div>
          {hasDiscount && (
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">할인 합계</span>
              <span className="text-red-600">
                {totalDiscount.toLocaleString()} 원
              </span>
            </div>
          )}
          {hasDiscount && (
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">할인 후 공급가</span>
              <span>{afterDiscountPrice.toLocaleString()} 원</span>
            </div>
          )}
          {taxType === "taxable" && (
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">부가세 (VAT 10%)</span>
              <span className="text-primary">{vat.toLocaleString()} 원</span>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-lg">최종 금액</span>
          <span className="font-bold text-2xl text-primary">
            {taxType === "taxable"
              ? includesTax.toLocaleString()
              : totalOriginalPrice.toLocaleString()}{" "}
            원
          </span>
        </div>
      </section>
    )
  );
}
