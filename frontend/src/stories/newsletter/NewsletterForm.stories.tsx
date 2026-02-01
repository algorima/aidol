import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

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

function PageWrapper({ isLoading = false }: { isLoading?: boolean }) {
  const [email, setEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    action("onSubmit")(email);
  };

  return (
    <div className="max-w-mobile mx-auto">
      <NewsletterForm
        email={email}
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isValidEmail={isValidEmail}
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
