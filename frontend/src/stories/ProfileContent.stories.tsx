import type { Meta, StoryObj } from "@storybook/react";

import { ProfileContent } from "@/components/companion/ProfileContent";
import type { Companion, CompanionStats } from "@/schemas/companion";

const meta: Meta<typeof ProfileContent> = {
  title: "Components/ProfileContent",
  component: ProfileContent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProfileContent>;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const sampleStats: CompanionStats = {
  vocal: 85,
  dance: 78,
  rap: 65,
  visual: 90,
  stamina: 72,
  charm: 88,
};

const baseCompanion: Companion = {
  id: "1",
  aidolId: "1",
  name: "홍길동",
  profilePictureUrl: sampleImage,
  grade: "A",
  position: "mainVocal",
  mbti: "ENFP",
  biography:
    "국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 위원은 정당에 가입하거나 정치에 관여할 수 없다.",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

/** 모든 정보가 있는 프로필 */
export const Default: Story = {
  args: {
    companion: baseCompanion,
  },
};

/** 능력치가 있는 프로필 */
export const WithStats: Story = {
  args: {
    companion: {
      ...baseCompanion,
      stats: sampleStats,
    },
  },
};

/** 능력치만 있고 바이오가 없는 프로필 */
export const StatsOnly: Story = {
  args: {
    companion: {
      ...baseCompanion,
      biography: undefined,
      stats: sampleStats,
    },
  },
};

/** 능력치 탭 숨김 */
export const HideStats: Story = {
  args: {
    companion: {
      ...baseCompanion,
      stats: sampleStats,
    },
    showStats: false,
  },
};
