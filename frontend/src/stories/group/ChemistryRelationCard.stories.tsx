import type { Meta, StoryObj } from "@storybook/react";

import { ChemistryRelationCard } from "@/components/group/ChemistryRelationCard";

const meta: Meta<typeof ChemistryRelationCard> = {
  title: "Components/Group/ChemistryRelationCard",
  component: ChemistryRelationCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="max-w-mobile p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChemistryRelationCard>;

export const Default: Story = {
  args: {
    fromName: "이안",
    toName: "서윤",
    fromLabel: "메인보컬",
    toLabel: "메인보컬",
  },
};

export const Expanded: Story = {
  args: {
    fromName: "이안",
    toName: "서윤",
    relationshipType: "동갑즈",
    description: "아직 어색해요",
    onClick: () => alert("카드 클릭"),
    onClose: () => alert("닫기"),
  },
};

export const LongNickname: Story = {
  args: {
    fromName: "이안",
    toName: "서윤",
    relationshipType: "엄청나게 긴 관계 별칭 엄청나게 긴 관계 별칭",
    description: "아직 어색해요",
    onClose: () => alert("닫기"),
  },
};

export const WithoutNickname: Story = {
  args: {
    fromName: "이안",
    toName: "서윤",
    description: "아직 어색해요",
    onClose: () => alert("닫기"),
  },
};

export const Clickable: Story = {
  args: {
    fromName: "이안",
    toName: "서윤",
    fromLabel: "메인보컬",
    toLabel: "서브보컬",
    onClick: () => alert("카드 클릭"),
  },
};
