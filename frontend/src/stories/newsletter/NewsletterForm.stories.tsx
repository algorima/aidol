import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

const meta: Meta<typeof NewsletterForm> = {
  title: "Components/Newsletter/NewsletterForm",
  component: NewsletterForm,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

const sampleImageUrl =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const handleSubmit = async (email: string) => {
  action("onSubmit")(email);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

function PageWrapper({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="max-w-mobile mx-auto">
      <NewsletterForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        bubbleProfileUrl={sampleImageUrl}
        previewImageUrl={sampleImageUrl}
      />
    </div>
  );
}

/** 기본 */
export const Default: Story = {
  render: () => <PageWrapper />,
};

/** 로딩 중 */
export const Loading: Story = {
  render: () => <PageWrapper isLoading />,
};
