import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/components/companion/Card";
import { Companion } from "@/schemas";

const meta: Meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const gradeCompanion: Companion = {
  id: "companion-1",
  name: "홍길동",
  profilePictureUrl: sampleImage,
  biography: "아이돌입니다",
  position: null,
  grade: "A",
  aidolId: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const Grade: Story = {
  args: {
    companion: gradeCompanion,
  },
};

const signedCompanion: Companion = {
  id: "companion-2",
  name: "홍길동",
  profilePictureUrl: sampleImage,
  biography: "아이돌입니다",
  position: null,
  grade: "A",
  aidolId: "aidol-1234",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const Signed: Story = {
  args: {
    companion: signedCompanion,
  },
};

const positionCompanion: Companion = {
  id: "companion-3",
  name: "홍길동",
  profilePictureUrl: sampleImage,
  biography: "아이돌입니다",
  position: "mainVocal",
  grade: "A",
  aidolId: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const Position: Story = {
  args: {
    companion: positionCompanion,
    variant: "position",
  },
};

export const Grid: Story = {
  render: () => (
    <div className="max-w-mobile">
      <div className="grid grid-cols-2 gap-6">
        <Card companion={gradeCompanion} />
        <Card companion={gradeCompanion} />
        <Card companion={positionCompanion} />
        <Card companion={signedCompanion} />
      </div>
    </div>
  ),
};
