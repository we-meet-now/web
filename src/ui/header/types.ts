// src/ui/header/types.ts

export type HeaderIconType =
  | 'back'
  | 'none'
  | 'close'
  | 'menu'
  | 'share'
  | 'search'
  | 'plus'
  | 'customText';

export interface HeaderIcon {
  type: HeaderIconType;
  onClick?: () => void; // 아이콘 클릭 핸들러
}

export interface HeaderProps {
  time?: string;
  title?: string;
  leftIcons?: HeaderIcon[]; // 왼쪽 아이콘 배열
  rightIcons?: HeaderIcon[]; // 오른쪽 아이콘 배열
  rightCustomText?: string;
  showSearchInput?: boolean;
}
