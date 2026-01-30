import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { CompleteContent } from "@/components/complete/CompleteContent";
import type { AIdol, Companion } from "@/schemas";

const meta: Meta<typeof CompleteContent> = {
  title: "Components/Complete/CompleteContent",
  component: CompleteContent,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CompleteContent>;

const sampleEmblemUrl =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const sampleProfileUrl =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const mockAidol: AIdol = {
  id: "aidol-1",
  name: "드리머즈",
  profileImageUrl: sampleEmblemUrl,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

const mockCompanions: Companion[] = [
  {
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
  },
  {
    id: "companion-2",
    aidolId: "aidol-1",
    name: "카이",
    profilePictureUrl: sampleProfileUrl,
    grade: "S",
    position: "mainDancer",
    mbti: "ISTP",
    biography:
      "타고난 춤 실력과 무대 장악력의 소유자. 과묵하지만 멤버들을 묵묵히 챙기는 따뜻한 마음의 소유자.",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "companion-3",
    aidolId: "aidol-1",
    name: "소라",
    profilePictureUrl: sampleProfileUrl,
    grade: "A",
    position: "mainRapper",
    mbti: "INFJ",
    biography:
      "감성적인 가사와 파워풀한 랩이 특기. 팀의 막내지만 누구보다 성숙한 사고방식을 가진 멤버.",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

function PageWrapper({
  aidol = mockAidol,
  companions = mockCompanions,
}: {
  aidol?: AIdol;
  companions?: Companion[];
}) {
  return (
    <div className="max-w-mobile mx-auto">
      <CompleteContent
        aidol={aidol}
        companions={companions}
        onCreateAnother={action("onCreateAnother")}
        onShare={action("onShare")}
        onNewsletter={action("onNewsletter")}
      />
    </div>
  );
}

/** 기본 완료 페이지 (멤버 3명) */
export const Default: Story = {
  render: () => <PageWrapper />,
};
