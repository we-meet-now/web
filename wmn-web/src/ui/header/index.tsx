import {
  ArrowLeftIcon,
  XMarkIcon,
  Bars3Icon,
  ShareIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import type { HeaderProps, HeaderIcon } from './types';
import { useState, type ChangeEvent } from 'react';

function Header({
  title = '오늘 우리가 만날 장소',
  leftIcons = [],
  rightIcons = [],
  rightCustomText,
  showSearchInput = false,
}: HeaderProps) {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 공통 아이콘 렌더러
  const renderIcon = (
    { type, onClick }: HeaderIcon,
    index: number,
    rightCustomText?: string,
  ) => {
    const commonProps = {
      key: index,
      className: 'w-5 h-5 cursor-pointer',
      onClick,
    };

    switch (type) {
      case 'back':
        return <ArrowLeftIcon {...commonProps} />;
      case 'close':
        return <XMarkIcon {...commonProps} />;
      case 'menu':
        return <Bars3Icon {...commonProps} />;
      case 'share':
        return <ShareIcon {...commonProps} />;
      case 'search':
        return <MagnifyingGlassIcon {...commonProps} />;
      case 'plus':
        return <PlusIcon {...commonProps} />;
      case 'customText':
        return (
          <span
            key={index}
            className="text-sm text-gray-600 cursor-pointer"
            onClick={onClick}
          >
            {rightCustomText}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-between items-center relative px-4 py-4 ">
      {/* 좌측 아이콘 */}
      <div className="flex items-center gap-2 z-10">
        {leftIcons.map((icon, index) => renderIcon(icon, index))}
      </div>

      {showSearchInput ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="검색"
          className="px-3 py-1 border rounded-md text-sm w-full max-w-xs"
        />
      ) : (
        <span className="font-semibold text-sm text-center">{title}</span>
      )}

      {/* 우측 아이콘 */}
      <div className="flex items-center gap-2 z-10">
        {rightIcons.map((icon, index) =>
          renderIcon(icon, index, rightCustomText),
        )}
      </div>
    </div>
  );
}

export default Header;
