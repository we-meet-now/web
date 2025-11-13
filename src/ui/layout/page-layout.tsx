import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'; // cx 대신 tailwind-merge 사용 추천

export type LayoutProps = {
  header?: ReactNode;
} & ComponentProps<'div'>;

export const PageLayout = (props: PropsWithChildren<LayoutProps>) => {
  const { header, children, className, ...rest } = props;

  return (
    <>
      {header}
      <div
        className={twMerge('flex-grow overflow-scroll', className)}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};
