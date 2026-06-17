import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BotCard from "./BotCard";

const meta = {
  title: "Common/BotCard",
  component: BotCard,
  tags: ["autodocs"],
} satisfies Meta<typeof BotCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WebsiteEstimate: Story = {
  args: {
    estimateTitle: "웹사이트 개발 견적서",
    estimateCompany: "(주)테크컴퍼니",
    estimateDate: "2026-06-05",
    estimagePrice: "1500만원",
  },
};

export const MobileAppEstimate: Story = {
  args: {
    estimateTitle: "모바일 앱 개발",
    estimateCompany: "스타트업코리아",
    estimateDate: "2026-06-04",
    estimagePrice: "2500만원",
  },
};

export const MaintenanceEstimate: Story = {
  args: {
    estimateTitle: "시스템 유지보수",
    estimateCompany: "글로벌기업",
    estimateDate: "2026-06-03",
    estimagePrice: "800만원",
  },
};

export const List: Story = {
  render: () => (
    <div className="flex w-[1040px] flex-col gap-3 bg-background p-4">
      <BotCard
        estimateTitle="웹사이트 개발 견적서"
        estimateCompany="(주)테크컴퍼니"
        estimateDate="2026-06-05"
        estimagePrice="1500만원"
      />

      <BotCard
        estimateTitle="모바일 앱 개발"
        estimateCompany="스타트업코리아"
        estimateDate="2026-06-04"
        estimagePrice="2500만원"
      />

      <BotCard
        estimateTitle="시스템 유지보수"
        estimateCompany="글로벌기업"
        estimateDate="2026-06-03"
        estimagePrice="800만원"
      />
    </div>
  ),
};
