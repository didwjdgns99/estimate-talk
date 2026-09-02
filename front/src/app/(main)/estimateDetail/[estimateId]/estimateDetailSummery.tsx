type EstimateItem = {
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

export default function EstimateDetailSummery({
  items,
  taxType,
}: EstimateProps) {
  const supplyPrice = items.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);

  const discountPrice = items.reduce((sum, item) => {
    const itemPrice = item.quantity * item.unitPrice;
    const discount = itemPrice * (item.discountRate / 100);

    return sum + discount;
  }, 0);

  const afterDiscountPrice = supplyPrice - discountPrice;

  const vat = taxType === "taxable" ? afterDiscountPrice * 0.1 : 0;

  const totalPrice = afterDiscountPrice + vat;

  return (
    <section className="mb-10 flex flex-col items-end bg-background rounded-lg py-6 px-4 text-[14px]">
      <div className="w-full flex flex-col gap-2 justify-between md:w-[70%]">
        <div className="flex justify-between">
          <span className="text-gray-500">공급가 합계</span>
          <span className="text-black/80">
            {supplyPrice.toLocaleString()} 원
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">할인 합계</span>
          <span className="text-red-500">
            {discountPrice.toLocaleString()} 원
          </span>
        </div>
        <div className="flex justify-between border-b">
          <span className="text-gray-500 mb-2">할인 후 공급가</span>
          <span className="text-black/80">
            {afterDiscountPrice.toLocaleString()} 원
          </span>
        </div>

        {taxType === "taxable" && (
          <div className="flex justify-between border-b-2 border-black">
            <span className="text-gray-500 mb-2">부가세</span>
            <span className="text-black/80">{vat.toLocaleString()} 원</span>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center">
            <span className="text-lg">최종 금액</span>
            <div className="flex flex-col items-end">
              <span className="text-lg font-bold">
                {" "}
                {totalPrice.toLocaleString()}원
              </span>
              <span className="text-gray-500 font-light">
                공급가 {afterDiscountPrice.toLocaleString()} + VAT{" "}
                {vat.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
