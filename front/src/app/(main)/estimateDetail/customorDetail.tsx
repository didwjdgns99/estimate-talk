export default function customorDetail() {
  return (
    <section className="px-8 py-8 flex justify-between">
      <div className="flex flex-col gap-2 w-[50%]">
        <span className="text-sm font-semibold text-muted-foreground tracking-wide">
          고객명
        </span>
        <h3 className="text-xl font-bold mb-1 ">삼성전자</h3>
      </div>
      <div className="w-[50%] flex flex-col gap-2">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          견적 정보
        </span>
        <div className="flex justify-between">
          <span className="text-[14px] text-muted-foreground">견적일자</span>
          <span className="text-[14px]">2026-06-05</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[14px] text-muted-foreground">과세유형</span>
          <span className="text-[14px]">비과세</span>
        </div>
      </div>
    </section>
  );
}
