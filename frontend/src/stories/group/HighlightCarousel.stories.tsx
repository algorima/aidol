import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { HighlightCarousel } from "@/components/group/HighlightCarousel";
import type { AIdolHighlight } from "@/schemas/highlight";

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const mockHighlights: AIdolHighlight[] = [
  {
    id: "highlight-001",
    aidolId: "aidol-group-001",
    title: "숙소 생활 후기",
    subtitle: "7일 후 물어본 멤버들의 속마음 😉",
    thumbnailUrl: sampleImage,
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "highlight-002",
    aidolId: "aidol-group-001",
    title: "첫 무대 비하인드",
    subtitle: "떨리는 마음을 담아서",
    thumbnailUrl: sampleImage,
    createdAt: "2026-01-30T00:00:00Z",
    updatedAt: "2026-01-30T00:00:00Z",
  },
  {
    id: "highlight-003",
    aidolId: "aidol-group-001",
    title: "연습실 브이로그",
    subtitle: "하루 종일 춤만 춰요",
    thumbnailUrl: sampleImage,
    createdAt: "2026-01-31T00:00:00Z",
    updatedAt: "2026-01-31T00:00:00Z",
  },
];

const meta: Meta<typeof HighlightCarousel> = {
  title: "Components/Group/HighlightCarousel",
  component: HighlightCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-base-100 p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    onItemClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof HighlightCarousel>;

export const Default: Story = {
  args: {
    items: mockHighlights,
  },
};

export const SingleItem: Story = {
  args: {
    items: [mockHighlights[0]],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...mockHighlights,
      ...mockHighlights.map((h) => ({ ...h, id: `${h.id}-copy` })),
    ],
  },
};
