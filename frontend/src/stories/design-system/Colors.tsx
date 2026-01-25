/**
 * ColorBox component represents a color box with a background color and text.
 * @param {string} color - The color class for the background.
 * @param {string} textColor - The color class for the text.
 * @param {string} children - The text content of the color box.
 */
function ColorBox({
  color,
  textColor,
  children,
}: {
  color: string;
  textColor: string;
  children: string;
}) {
  return (
    <div
      className={`flex size-40 items-center justify-center rounded text-headline-s ${color} ${textColor}`}
    >
      {children}
    </div>
  );
}

/**
 * Colors component showcases the color palette used in the design system.
 * It includes all available colors from the daisyUI theme.
 */
export function Colors() {
  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-wrap gap-4">
        <ColorBox color="bg-primary" textColor="text-white">
          Primary
        </ColorBox>
        <ColorBox color="bg-primary-content" textColor="text-white">
          Primary Content
        </ColorBox>
        <ColorBox color="bg-secondary" textColor="text-white">
          Secondary
        </ColorBox>
        <ColorBox color="bg-secondary-content" textColor="text-white">
          Secondary Content
        </ColorBox>
      </div>
      <div className="flex flex-wrap gap-4">
        <ColorBox color="bg-accent" textColor="text-white">
          Accent
        </ColorBox>
        <ColorBox color="bg-accent-content" textColor="text-white">
          Accent Content
        </ColorBox>
      </div>
      <div className="flex flex-wrap gap-4">
        <ColorBox color="bg-base-100" textColor="text-base-content">
          Base 100
        </ColorBox>
        <ColorBox color="bg-base-200" textColor="text-base-content">
          Base 200
        </ColorBox>
        <ColorBox color="bg-base-300" textColor="text-base-content">
          Base 300
        </ColorBox>
        <ColorBox color="bg-neutral" textColor="text-white">
          Neutral
        </ColorBox>
      </div>
      <div className="flex flex-wrap gap-4">
        <ColorBox color="bg-info" textColor="text-white">
          Info
        </ColorBox>
        <ColorBox color="bg-info-content" textColor="text-white">
          Info Content
        </ColorBox>
        <ColorBox color="bg-success" textColor="text-white">
          Success
        </ColorBox>
        <ColorBox color="bg-success-content" textColor="text-white">
          Success Content
        </ColorBox>
      </div>
      <div className="flex flex-wrap gap-4">
        <ColorBox color="bg-warning" textColor="text-white">
          Warning
        </ColorBox>
        <ColorBox color="bg-warning-content" textColor="text-white">
          Warning Content
        </ColorBox>
        <ColorBox color="bg-error" textColor="text-white">
          Error
        </ColorBox>
        <ColorBox color="bg-error-content" textColor="text-white">
          Error Content
        </ColorBox>
      </div>
    </div>
  );
}
