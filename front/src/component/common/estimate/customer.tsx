import Input from "@/component/common/Input";

export default function Customer() {
  return (
    <section className="bg-card rounded-2xl border border-border p-5 space-y-4 w-full">
      <span className="text-sm text-muted-foreground">기본 정보</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <Input
          label="견적서 제목"
          placeholder="견적서 제목을 입력하세요"
          className="w-full"
        />
        <Input
          label="고객사명"
          placeholder="고객사명을 입력하세요"
          className="w-full"
        />
      </div>
    </section>
  );
}
