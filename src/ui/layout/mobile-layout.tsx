import type { ComponentProps } from 'react';
type MobileLayoutProps = ComponentProps<'div'>;

export const MobileLayout = (props: MobileLayoutProps) => {
  const { children, ...restProps } = props;

  return (
    <div className="flex flex-col items-center w-full bg-gray-200 h-dvh">
      <div
        className="flex flex-col w-full max-w-[440px] h-dvh bg-white"
        {...restProps}
      >
        {children}
      </div>
    </div>
  );
};
