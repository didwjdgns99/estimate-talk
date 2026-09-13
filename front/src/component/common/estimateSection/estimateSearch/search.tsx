import Image from "next/image";
import search from "@/public/search.svg";
import Input from "@/component/common/Input";

export default function EstimateSearch({
  searchKeyword,
  setSearchKeyword,
}: {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <Image
        src={search}
        alt="검색 아이콘"
        width={25}
        height={25}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
      />

      <Input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="pl-14 text-lg"
        placeholder="상호명으로 검색..."
      />
    </div>
  );
}
