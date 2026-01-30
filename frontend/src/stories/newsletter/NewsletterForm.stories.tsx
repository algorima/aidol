import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import type { Companion } from "@/schemas";

const meta: Meta<typeof NewsletterForm> = {
  title: "Components/Newsletter/NewsletterForm",
  component: NewsletterForm,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

const sampleProfileUrl =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const mockCompanion: Companion = {
  id: "companion-1",
  aidolId: "aidol-1",
  name: "루나",
  profilePictureUrl: sampleProfileUrl,
  grade: "A",
  position: "mainVocal",
  mbti: "ENFP",
  biography:
    "맑고 청량한 목소리의 소유자. 무대 위에서는 카리스마 넘치지만 평소에는 장난기 가득한 분위기 메이커!",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

const handleSubmit = async (email: string) => {
  action("onSubmit")(email);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

function PageWrapper({
  companion,
  isLoading = false,
}: {
  companion?: Companion;
  isLoading?: boolean;
}) {
  return (
    <div className="max-w-mobile mx-auto">
      <NewsletterForm
        companion={companion}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

/** 기본 (프로필 이미지 있음) */
export const Default: Story = {
  render: () => <PageWrapper companion={mockCompanion} />,
};

/** 로딩 중 */
export const Loading: Story = {
  render: () => <PageWrapper companion={mockCompanion} isLoading />,
};
