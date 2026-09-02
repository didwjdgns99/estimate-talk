"use client";

import Input from "@/component/common/Input";
import { useState } from "react";
import {
  EstimateItem,
  createEmptyItem,
} from "@/component/common/estimate/estimateItem";
import Image from "next/image";
import deleteIcon from "@/public/deleteIcon.svg";

type ItemType = "description" | "quantity" | "unitPrice";

type CreateEstimateProps = {
  items: EstimateItem[];
  setItems: React.Dispatch<React.SetStateAction<EstimateItem[]>>;
};

export default function CreateEstimate({
  items,
  setItems,
}: CreateEstimateProps) {
  //할인 품목 토글
  const [openedDiscountIds, setOpenedDiscountIds] = useState<string[]>([]);
  const [customDiscounts, setCustomDiscounts] = useState<
    Record<string, string>
  >({});
  //항목추가
  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  //인풋 온체인지
  const onChangeItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string, //행 아이디
    fieldType: ItemType, // 품목/단가/수량 타입
  ) => {
    const value =
      fieldType === "description"
        ? e.target.value
        : Number(e.target.value.replace(/[^0-9]/g, ""));

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [fieldType]: value,
            }
          : item,
      ),
    );
  };

  const handleDiscountChange = (itemId: string, discountRate: number) => {
    const safeDiscountRate = Math.min(Math.max(discountRate, 0), 100);

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              discountRate: safeDiscountRate,
            }
          : item,
      ),
    );
  };

  const handleToggleDiscount = (itemId: string) => {
    setOpenedDiscountIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleCustomDiscountChange = (itemId: string, value: string) => {
    const onlyNumber = value.replace(/[^0-9]/g, ""); //문자와 특수문자 (-)제거

    const safeValue =
      onlyNumber === "" ? "" : String(Math.min(Number(onlyNumber), 100)); //할인율 0~100으로 제한 onlyNumber와 100중 작은값을 적용

    setCustomDiscounts((prev) => ({
      ...prev,
      [itemId]: safeValue, //해당 아이템아이디에 밸류값을 바꾸기 위해
    }));

    handleDiscountChange(itemId, safeValue === "" ? 0 : Number(onlyNumber));
  };

  const onClickDeleteItem = (itemId: string, index: number) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <section className="w-full rounded-2xl border border-border bg-white p-5">
      <div className="flex justify-between">
        <span>견적 항목</span>

        <button
          type="button"
          onClick={handleAddItem}
          className="cursor-pointer rounded-xl bg-primary px-4 py-2 text-white"
        >
          + 항목추가
        </button>
      </div>

      <div>
        {items.map((item, index) => {
          const originalPrice = item.quantity * item.unitPrice;

          const discountPrice = originalPrice * (item.discountRate / 100);

          const totalPrice = originalPrice - discountPrice;

          const isDiscountOpen = openedDiscountIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="mt-4 md:grid grid-cols-[2.5fr_0.7fr_1.5fr_150px] items-end gap-4"
            >
              <Input
                className="mb-2 md:mb-0"
                label="품목/내용"
                value={item.description}
                placeholder="품목/내용을 입력하세요"
                onChange={(e) => onChangeItem(e, item.id, "description")}
              />

              <Input
                className="mb-2 md:mb-0"
                label="수량"
                type="number"
                value={item.quantity}
                placeholder="수량을 입력하세요"
                onChange={(e) => onChangeItem(e, item.id, "quantity")}
              />

              <Input
                label="단가"
                type="text"
                value={item.unitPrice.toLocaleString("ko-KR")}
                placeholder="단가를 입력하세요"
                onChange={(e) => onChangeItem(e, item.id, "unitPrice")}
              />
              <div className="flex gap-4 my-2 md:my-0">
                <div className="flex flex-col">
                  {item.discountRate > 0 && (
                    <span className="text-xs text-gray-400 line-through">
                      {originalPrice.toLocaleString()}원
                    </span>
                  )}

                  <span className="font-semibold">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => onClickDeleteItem(item.id, index)}
                  >
                    <Image src={deleteIcon} alt="삭제" width={24} height={24} />
                  </button>
                )}
              </div>

              <div className="col-span-4">
                <button
                  type="button"
                  onClick={() => handleToggleDiscount(item.id)}
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    item.discountRate > 0
                      ? "border-primary bg-blue-50 text-primary"
                      : "border-border bg-white"
                  }`}
                >
                  {item.discountRate > 0
                    ? `${item.discountRate}% 할인 적용`
                    : "할인 없음"}
                </button>

                {isDiscountOpen && (
                  <div className="mt-2 flex items-end gap-3">
                    <div className="flex gap-2">
                      {[0, 5, 10, 15, 20].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => {
                            handleDiscountChange(item.id, rate);
                            setCustomDiscounts((prev) => ({
                              ...prev,
                              [item.id]: "",
                            }));
                          }}
                          className={`rounded-xl border px-3 py-2 text-sm ${
                            item.discountRate === rate
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-white text-gray-700"
                          }`}
                        >
                          {rate === 0 ? "없음" : `${rate}%`}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-36">
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="직접 입력"
                        value={customDiscounts[item.id] ?? ""}
                        onChange={(e) =>
                          handleCustomDiscountChange(item.id, e.target.value)
                        }
                        className="pr-8"
                      />

                      {customDiscounts[item.id] && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                          %
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
