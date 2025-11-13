import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './index';

const meta: Meta<typeof Header> = {
  title: 'UI/Header',
  component: Header,
  tags: ['autodocs'], // Docs 탭 자동 생성
};

export default meta;
type Story = StoryObj<typeof Header>;

// 기본 헤더
export const Default: Story = {
  args: {
    title: '오늘 우리가 만날 장소',
    leftIcons: [{ type: 'back', onClick: () => alert('뒤로가기 클릭!') }],
    rightIcons: [
      { type: 'share', onClick: () => alert('공유 클릭!') },
      { type: 'search', onClick: () => console.log('검색 클릭!') },
    ],
  },
};

// 검색창 모드
export const WithSearchInput: Story = {
  args: {
    showSearchInput: true,
    leftIcons: [{ type: 'back', onClick: () => console.log('뒤로가기') }],
  },
};

// 오른쪽 커스텀 텍스트
export const WithCustomText: Story = {
  args: {
    rightCustomText: '완료',
    leftIcons: [{ type: 'back', onClick: () => alert('뒤로가기!') }],
    rightIcons: [
      { type: 'customText', onClick: () => alert('완료 버튼 클릭!') },
    ],
  },
};

// 아이콘 여러 개
export const WithMultipleIcons: Story = {
  args: {
    leftIcons: [{ type: 'menu', onClick: () => alert('메뉴 클릭!') }],
    rightIcons: [
      { type: 'plus', onClick: () => alert('추가 클릭!') },
      { type: 'share', onClick: () => alert('공유 클릭!') },
      { type: 'search', onClick: () => alert('검색 클릭!') },
    ],
  },
};
