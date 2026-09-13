import TopCard from "@/component/common/topcard/TopCard";
import { FileText, Calendar, TrendingUp } from "lucide-react";
import { getMeAction } from "../action/getMe.action";
import { getEstimateAction } from "@/app/action/estimate.action";
import { EstimateItem } from "@/apis/Esimate";
import EstimateSection from "@/component/common/estimateSection/page";

type Estimate = {
  _id: string;
  title: string;
  customer: string;
  taxType: "taxable" | "taxFree";
  items: EstimateItem[];
  createdAt: string;
};

export default async function Home() {
  const result = await getMeAction();

  const user = result?.user;
  const estimateResult = user ? await getEstimateAction(1, 3) : null;

  const estimateList: Estimate[] = estimateResult?.data?.estimateList ?? [];
  console.log("에스티메이트리스트", estimateList);

  const estimateLength = estimateList.length;

  const now = new Date();

  const thisMonthEstimateList = estimateList.filter((estimate) => {
    const createdAt = new Date(estimate.createdAt);

    return (
      createdAt.getFullYear() === now.getFullYear() &&
      createdAt.getMonth() === now.getMonth()
    );
  });

  const recentEstimate = estimateList[0];

  const recentPrice = recentEstimate
    ? recentEstimate.items.reduce((sum, item) => {
        const itemPrice = item.quantity * item.unitPrice;
        const discountPrice = itemPrice * (item.discountRate / 100);
        const afterDiscountPrice = itemPrice - discountPrice;

        const vat =
          recentEstimate.taxType === "taxable" ? afterDiscountPrice * 0.1 : 0;

        return sum + afterDiscountPrice + vat;
      }, 0)
    : 0;

  const thisMonthEstimateLength = thisMonthEstimateList.length;

  return (
    <main className="min-h-screen bg-background text-main-text">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold">견적서 관리</h1>
        <p className="mt-3 text-secondary-text tracking-wider">
          전체 견적서를 관리하고 새로운 견적서를 작성하세요
        </p>
      </section>
      <section className="flex justify-space-between w-full mx-auto max-w-6xl px-6 py-10 gap-4">
        <TopCard
          className="flex-1"
          title="전체 견적서"
          value={estimateLength}
          icon={<FileText className="text-primary" size={22} />}
        />
        <TopCard
          className="flex-1"
          title="이번달"
          value={thisMonthEstimateLength}
          icon={<Calendar className="text-primary" size={22} />}
        />
        <TopCard
          className="flex-1"
          title="최근 견적 금액"
          value={`${recentPrice.toLocaleString()}원`}
          icon={<TrendingUp className="text-primary" size={22} />}
        />
      </section>
      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <EstimateSection user={user} estimateList={estimateList} />
        </div>
      </section>
    </main>
  );
}
