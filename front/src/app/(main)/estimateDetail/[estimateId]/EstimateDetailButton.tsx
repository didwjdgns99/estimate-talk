"use client";

import { Printer, FileDown } from "lucide-react";

export default function EstimateDetailButton() {
  const handlePrint = () => {
    window.print();
  };

  const handlePdfDownload = async () => {
    const element = document.getElementById("estimate-document");

    if (!element) return;

    const html2canvas = (await import("html2canvas-pro")).default; //화면 이미지로 캡처
    const { jsPDF } = await import("jspdf"); // 캡처된 이미지 를 PDF로 변환

    //내가 정한 영역 캡처
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait", //세로방향 landscape:가로방향
      unit: "mm", //크기 계산 단위
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //데이터 ,형식,시작위치,크기
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    pdf.save("견적서.pdf");
  };

  return (
    <div className="print:hidden flex gap-4">
      <button
        className="cursor-pointer flex items-center gap-1"
        onClick={handlePrint}
      >
        <Printer className="h-4 w-4" />
        인쇄
      </button>

      <button
        className="cursor-pointer flex items-center gap-1"
        onClick={handlePdfDownload}
      >
        <FileDown className="h-4 w-4" />
        PDF 다운로드
      </button>
    </div>
  );
}
