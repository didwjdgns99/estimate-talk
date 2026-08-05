"use client";

import Input from "@/component/common/Input";
import { useState } from "react";

type EstimateItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type ItemType = "description" | "quantity" | "unitPrice";

const createEmptyItem = (): EstimateItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
});

export default function CreateEstimate() {
  const [items, setItems] = useState<EstimateItem[]>([createEmptyItem()]);
  const [isDiscount, setIsDiscount] = useState(false);
  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const onChangeItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    fieldType: ItemType,
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

  return (
    <section className="bg-white border border-border rounded-2xl p-5 w-full">
      <div className="flex justify-between ">
        <span>견적 항목</span>
        <button
          onClick={handleAddItem}
          className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          + 항목추가
        </button>
      </div>
      <div>
        {items.map((item) => {
          const quantity = Number(item.quantity) || 0;
          const unitPrice = Number(item.unitPrice) || 0;
          const totalPrice = quantity * unitPrice;
          return (
            <div
              key={item.id}
              className="
    mt-4 grid items-end gap-4
    grid-cols-[2.5fr_0.7fr_1.5fr_120px]
  "
            >
              <Input
                label="품목/내용"
                value={item.description}
                placeholder="품목/내용을 입력하세요"
                onChange={(e) => onChangeItem(e, item.id, "description")}
              />
              <Input
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
              <span>{totalPrice.toLocaleString()} 원</span>
              <div>
                <button
                  type="button"
                  onClick={() => setIsDiscount((prev) => !prev)}
                >
                  {isDiscount ? "% 할인 없음" : "할인 없음"}
                </button>
                {isDiscount && (
                  <div>
                    <div className="flex gap-2">
                      <button className="rounded-xl px-2 py-1 border border-border text-sm">
                        없음
                      </button>
                      <button className="rounded-xl px-2 py-1 border border-border text-sm">
                        5%
                      </button>
                      <button className="rounded-xl px-2 py-1 border border-border text-sm">
                        10%
                      </button>
                      <button className="rounded-xl px-2 py-1 border border-border text-sm">
                        15%
                      </button>
                      <button className="rounded-xl px-2 py-1 border border-border text-sm">
                        25%
                      </button>
                    </div>
                    <Input placeholder="직접 입력" />
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
