import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Input from "./Input";

const meta = {
  title: "Common/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
    helperText: "8자 이상 입력해주세요.",
  },
};

export const WithError: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    errorMessage: "이메일 형식이 올바르지 않습니다.",
  },
};

export const Disabled: Story = {
  args: {
    label: "이메일",
    placeholder: "입력할 수 없습니다.",
    disabled: true,
  },
};

export const EstimatePrice: Story = {
  args: {
    label: "단가",
    placeholder: "0",
    inputMode: "numeric",
  },
};
