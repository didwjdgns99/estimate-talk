import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FileText, Calendar, TrendingUp } from "lucide-react";
import TopCard from "./TopCard";

const meta = {
  title: "Common/TopCard",
  component: TopCard,
  tags: ["autodocs"],
} satisfies Meta<typeof TopCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TotalEstimate: Story = {
  args: {
    title: "전체 견적서",
    value: 3,
    icon: <FileText className="text-primary" size={22} />,
  },
};

export const ThisMonth: Story = {
  args: {
    title: "이번 달",
    value: 3,
    icon: <Calendar className="text-primary" size={22} />,
  },
};

export const TotalAmount: Story = {
  args: {
    title: "총 금액",
    value: "4800만원",
    icon: <TrendingUp className="text-primary" size={22} />,
  },
};
