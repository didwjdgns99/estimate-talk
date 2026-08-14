"use client";

import Input from "@/component/common/Input";
import Button from "@/component/common/button/button";
import { useState,useEffect } from "react";
import trash from "@/public/trash.svg";
import Image from "next/image";
import EstimateForm from "./estimateForm";
import {useUser} from "@/context/userContext"
import { useRouter } from "next/navigation";


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

  const router = useRouter()
 const { user } = useUser();

useEffect(() => {
  if (!user) {
    router.replace("/login");
  }
}, [user, router]);


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
  
  );
}
