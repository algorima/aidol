import {
  ChatBubbleLeftEllipsisIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/components/Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/** 제목만 표시하는 기본 헤더 */
export const TitleOnly: Story = {
  args: {
    title: "그룹 기획",
  },
};

/** 뒤로가기 버튼 + 제목 */
export const WithBackButton: Story = {
  args: {
    title: "Label",
    onBackClick: () => alert("뒤로 가기"),
  },
};

/** 닫기 버튼 + 제목 */
export const WithCloseButton: Story = {
  args: {
    title: "팔로우",
    onCloseClick: () => alert("닫기"),
  },
};

/** 로고만 표시 */
export const Logo: Story = {
  args: {
    logo: true,
  },
};

/** 드롭다운 + 오른쪽 버튼들 */
export const WithDropdown: Story = {
  render: () => (
    <Header title="label" onDropdownClick={() => alert("드롭다운 클릭")}>
      <button
        type="button"
        className="text-base-content flex size-10 items-center justify-center"
        onClick={() => alert("아이콘 클릭")}
      >
        <ChatBubbleLeftEllipsisIcon className="text-base-content size-6" />
      </button>
      <button
        type="button"
        className="text-label-l text-base-content/70 px-2"
        onClick={() => alert("텍스트 클릭")}
      >
        label
      </button>
    </Header>
  ),
};

/** 제목 + 액션 버튼 */
export const WithActionButton: Story = {
  render: () => (
    <Header title="Label">
      <button
        type="button"
        className="btn btn-primary btn-sm gap-1"
        onClick={() => alert("액션 클릭")}
      >
        label
        <PlusIcon className="size-4" />
      </button>
    </Header>
  ),
};

/** 뒤로가기 + 제목 + 아이콘 버튼 */
export const WithBackAndIcon: Story = {
  render: () => (
    <Header title="르누아르" onBackClick={() => alert("뒤로 가기")}>
      <button
        type="button"
        className="text-base-content flex size-10 items-center justify-center"
        onClick={() => alert("채팅")}
      >
        <ChatBubbleLeftEllipsisIcon className="size-6" />
      </button>
    </Header>
  ),
};
