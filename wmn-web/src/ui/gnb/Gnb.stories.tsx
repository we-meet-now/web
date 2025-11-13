import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gnb } from './gnb';

const meta: Meta<typeof Gnb> = {
  title: 'UI/Gnb',
  component: Gnb,
  tags: ['autodocs'], // 자동 문서화
};

export default meta;
type Story = StoryObj<typeof Gnb>;

/**
 * 기본 하단 네비게이션
 */
export const Default: Story = {
  render: () => (
    <div className="relative h-dvh flex flex-col items-center justify-end bg-gray-100">
      <Gnb />
    </div>
  ),
};

/**
 * 회색 배경의 미리보기 (모바일 화면 시뮬레이션)
 */
export const InMobileLayout: Story = {
  render: () => (
    <div className="flex justify-center items-center w-full h-dvh bg-gray-200">
      <div className="relative flex flex-col w-full max-w-[440px] h-dvh bg-white">
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-lg font-bold">모바일 컨텐츠</h1>
          <p>본문 내용이 여기에 들어갑니다.</p>
        </div>
        <Gnb />
      </div>
    </div>
  ),
};
