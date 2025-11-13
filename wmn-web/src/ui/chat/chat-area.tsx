import { PropsWithChildren } from 'react';

export const ChatArea = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <ul className="flex flex-col gap-2 overflow-y-auto h-[88%] px-5 py-2">
      {children}
    </ul>
  );
};
