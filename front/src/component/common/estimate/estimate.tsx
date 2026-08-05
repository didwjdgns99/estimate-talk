"use client";

import Input from "@/component/common/Input";
import Button from "@/component/common/button/button";
import { useState } from "react";
import trash from "@/public/trash.svg";
import Image from "next/image";
import EstimateForm from "./estimateForm";

type Column = {
  id: string;
  label: string;
  placeholder: string;
  inputType: "text" | "number";
};

type EstimateRow = {
  id: string;
  values: Record<string, string>; //열 추가 확장을 위해
};

const columns: Column[] = [
  {
    id: "description",
    label: "품목/내용",
    placeholder: "견적상품을 입력하세요.",
    inputType: "text",
  },
  {
    id: "quantity",
    label: "수량",
    placeholder: "1",
    inputType: "number",
  },
  {
    id: "unitPrice",
    label: "단가",
    placeholder: "10,000",
    inputType: "number",
  },
];

const createEmptyRow = (columns: Column[]) => {
  return {
    id: crypto.randomUUID(),
    //[][]를 객체로 바꿔준다
    values: Object.fromEntries(
      columns.map((column) => [column.id, column.id === "quantity" ? "1" : ""]), //key,value
    ),
  };
};

export default function Estimate() {
  const [rows, setRows] = useState<EstimateRow[]>(() => [
    createEmptyRow(columns),
  ]); //useState로는 아무인자도 안줘도되는 createEmptyRow는 columns를 다른곳에서 받아서 실행되는 함수가 초기값이다

  const handleAddRow = () => {
    setRows((prevRows) => [
      // 기존에 있던 행들을 그대로 복사한다.
      ...prevRows,

      // 기존 행들 뒤에 새로운 빈 행을 하나 추가한다.
      createEmptyRow(columns),
    ]);
  };

  const handleDeleteRow = (rowId: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  const handleRowValueChange = (
    rowId: string,
    columnId: string,
    value: string,
  ) => {
    setRows((prevRows) =>
      // 모든 행을 하나씩 확인한다.
      prevRows.map((row) =>
        // 현재 확인 중인 행이 수정하려는 행인지 비교한다.
        row.id === rowId
          ? {
              // 수정하려는 행이라면 기존 행 정보를 먼저 복사한다.
              ...row,

              values: {
                // 기존 품목, 수량, 단가 값을 모두 복사한다.
                ...row.values,

                /*
                  사용자가 입력한 열의 값만 변경한다.

                  columnId가 "quantity"이고
                  value가 "3"이라면

                  quantity: "3"

                  으로 변경된다.
                */
                [columnId]: value,
              },
            }
          : // 수정하려는 행이 아니면 기존 행을 그대로 반환한다.
            row,
      ),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //추후에 제출 데이터 넣기
  };

  const totalAmount = rows.reduce((sum, row) => {
    const quantity = Number(row.values.quantity) || 0;
    const unitPrice = Number(row.values.unitPrice) || 0;

    return sum + quantity * unitPrice;
  }, 0);

  return (
    <EstimateForm />
    // <form
    //   onSubmit={handleSubmit}
    //   className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-2xl bg-white p-8 shadow"
    // >
    //   <div className="flex flex-col gap-6 lg:flex-row">
    //     <div className="flex-1">
    //       <Input
    //         label="견적서 제목"
    //         placeholder="견적서 제목을 입력하세요"
    //         className="w-full"
    //       />
    //     </div>
    //     <div className="flex-1">
    //       <Input
    //         label="고객사명"
    //         placeholder="고객 이름을 입력하세요"
    //         className="w-full"
    //       />
    //     </div>
    //   </div>
    //   <div className="border-b border-gray-200 pb-6">
    //     <div className="flex items-center justify-between">
    //       <span className="text-xl font-bold">견적 항목</span>
    //       <Button
    //         variant="primary"
    //         type="button"
    //         children="항목 추가"
    //         onClick={handleAddRow}
    //       />
    //     </div>
    //     <div className="flex flex-col gap-4">
    //       {rows.map((row, rowIndex) => {
    //         const quantity = Number(row.values.quantity) || 0;
    //         const unitPrice = Number(row.values.unitPrice) || 0;
    //         const rowTotal = quantity * unitPrice;
    //         return (
    //           <div
    //             key={row.id}
    //             className="flex flex-row max-md:flex-col gap-3"
    //           >
    //             {/* 품목/내용 */}
    //             <div className="w-full md:max-w-[450px]">
    //               {rowIndex === 0 && (
    //                 <label className="mb-2 w-auto block text-sm font-semibold text-gray-900">
    //                   품목/내용
    //                 </label>
    //               )}
    //               <Input
    //                 placeholder="견적상품을 입력하세요."
    //                 type="text"
    //                 value={row.values.description ?? ""}
    //                 onChange={(event) =>
    //                   handleRowValueChange(
    //                     row.id,
    //                     "description",
    //                     event.target.value,
    //                   )
    //                 }
    //                 className="w-full "
    //               />
    //             </div>

    //             {/* 수량 / 단가 / 합계 / 삭제 */}
    //             <div className="grid grid-cols-[1fr_auto_28px] items-end gap-2">
    //               <div className="flex gap-4 w-full">
    //                 {/* 수량 */}
    //                 <div className="min-w-0 max-w-[200px]">
    //                   {rowIndex === 0 && (
    //                     <label className="min-w-25 mb-2 block text-sm font-semibold text-gray-900">
    //                       수량
    //                     </label>
    //                   )}
    //                   <Input
    //                     placeholder="1"
    //                     type="number"
    //                     value={row.values.quantity ?? ""}
    //                     onChange={(event) =>
    //                       handleRowValueChange(
    //                         row.id,
    //                         "quantity",
    //                         event.target.value,
    //                       )
    //                     }
    //                     className="w-full "
    //                   />
    //                 </div>

    //                 {/* 단가 */}
    //                 <div className="min-w-0 max-w-[200px]">
    //                   {rowIndex === 0 && (
    //                     <label className="mb-2 block text-sm font-semibold text-gray-900">
    //                       단가
    //                     </label>
    //                   )}
    //                   <Input
    //                     placeholder="10,000"
    //                     type="text"
    //                     inputMode="numeric" //모바일 키패드 보여주기
    //                     value={
    //                       row.values.unitPrice
    //                         ? Number(row.values.unitPrice).toLocaleString(
    //                             "ko-KR",
    //                           )
    //                         : ""
    //                     }
    //                     onChange={(event) => {
    //                       const value = event.target.value.replace(
    //                         /[^0-9]/g,
    //                         "",
    //                       );

    //                       handleRowValueChange(row.id, "unitPrice", value);
    //                     }}
    //                     className="w-full"
    //                   />
    //                 </div>
    //               </div>

    //               {/* 합계 */}
    //               <div className="flex h-12 items-end justify-end whitespace-nowrap text-[14px] mb-1 font-semibold">
    //                 {rowTotal.toLocaleString()}원
    //               </div>

    //               {/* 삭제 */}
    //               {rowIndex > 0 ? (
    //                 <button
    //                   type="button"
    //                   onClick={() => handleDeleteRow(row.id)}
    //                   className="flex h-12 w-7 items-end justify-end text-red-500 hover:text-red-600 mb-1"
    //                   aria-label={`${rowIndex + 1}번째 항목 삭제`}
    //                 >
    //                   <Image
    //                     src={trash}
    //                     alt="삭제이미지"
    //                     width={20}
    //                     height={20}
    //                   />
    //                 </button>
    //               ) : (
    //                 <div className="h-12 w-7" />
    //               )}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    //   <div>
    //     <div className="flex justify-between mb-4">
    //       <span className="text-xl font-semibold">총 금액</span>
    //       <span className="text-primary font-bold text-3xl">
    //         {totalAmount.toLocaleString("ko-KR")}원
    //       </span>
    //     </div>
    //     <Button
    //       variant="primary"
    //       type="submit"
    //       children="AI 검토 후 저장하기"
    //       className="w-full text-lg"
    //     />
    //   </div>
    // </form>
  );
}
