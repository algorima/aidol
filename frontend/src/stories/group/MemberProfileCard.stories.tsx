import type { Meta, StoryObj } from "@storybook/react";

import { MemberProfileCard } from "@/components/group/MemberProfileCard";
import type { Companion } from "@/schemas/companion";

const meta: Meta<typeof MemberProfileCard> = {
  title: "Components/Group/MemberProfileCard",
  component: MemberProfileCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MemberProfileCard>;

const sampleCompanion: Companion = {
  id: "1",
  name: "이안",
  biography:
    "키 187, 몸무게 78. 수영을 좋아해서 매일 수영장에 갑니다. 무대 위에서는 카리스마 넘치지만 평소에는 조용한 성격입니다.",
  profilePictureUrl:
    "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop",
  grade: "A",
  mbti: "ENFJ",
  position: "MAIN_VOCAL",
  status: "PUBLISHED",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

export const Default: Story = {
  args: {
    companion: sampleCompanion,
  },
};

export const WithoutImage: Story = {
  args: {
    companion: {
      ...sampleCompanion,
      profilePictureUrl: null,
    },
  },
};

export const MinimalData: Story = {
  args: {
    companion: {
      id: "2",
      name: "서윤",
      grade: "B",
      status: "PUBLISHED",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
};
