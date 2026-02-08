import type { Meta, StoryObj } from "@storybook/react";

import { SelectMemberStep } from "@/components/chemistry/SelectMemberStep";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companionRelationship";

const MOCK_COMPANIONS: Companion[] = [
  {
    id: "c-1",
    aidolId: "aidol-1",
    name: "이안",
    profilePictureUrl: null,
    status: "published",
    position: "mainVocal",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "c-2",
    aidolId: "aidol-1",
    name: "서윤",
    profilePictureUrl: null,
    status: "published",
    position: "subVocal",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "c-3",
    aidolId: "aidol-1",
    name: "테오",
    profilePictureUrl: null,
    status: "published",
    position: "mainDancer",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "c-4",
    aidolId: "aidol-1",
    name: "하루",
    profilePictureUrl: null,
    status: "published",
    position: "mainRapper",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
];

const MOCK_RELATIONSHIP: CompanionRelationship = {
  id: "rel-1",
  fromCompanionId: "c-1",
  toCompanionId: "c-2",
  intimacy: 60,
  nickname: "동갑즈",
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
};

const meta: Meta<typeof SelectMemberStep> = {
  title: "Components/Chemistry/SelectMemberStep",
  component: SelectMemberStep,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="bg-base-100 max-w-mobile">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectMemberStep>;

export const Default: Story = {
  args: {
    companions: MOCK_COMPANIONS,
    relationships: [],
    fromCompanionId: "c-1",
    selectedCompanionId: null,
    onSelect: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    companions: MOCK_COMPANIONS,
    relationships: [],
    fromCompanionId: "c-1",
    selectedCompanionId: "c-3",
    onSelect: () => {},
  },
};

export const WithExistingRelationship: Story = {
  args: {
    companions: MOCK_COMPANIONS,
    relationships: [MOCK_RELATIONSHIP],
    fromCompanionId: "c-1",
    selectedCompanionId: null,
    onSelect: () => {},
  },
};
