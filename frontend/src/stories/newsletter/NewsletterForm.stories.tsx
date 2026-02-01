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

const handleSubmit = async (email: string) => {
  action("onSubmit")(email);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

function PageWrapper({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="max-w-mobile mx-auto">
      <NewsletterForm onSubmit={handleSubmit} isLoading={isLoading} />
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
