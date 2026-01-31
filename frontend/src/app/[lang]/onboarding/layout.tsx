interface OnboardingLayoutProps {
  children: React.ReactNode;
}

/**
 * 온보딩 페이지 전용 레이아웃
 * 부모 layout의 max-w-mobile 제약을 무시하고 전체 너비 사용
 */
export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="bg-base-100 fixed inset-0 z-50 overflow-auto">
      {children}
    </div>
  );
}
