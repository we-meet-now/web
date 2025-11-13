import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    typeVariant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    state: {
      control: { type: 'radio' },
      options: ['default', 'hover', 'pressed', 'disabled'],
    },
    size: {
      control: { type: 'radio' },
      options: [36, 48],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Default: Story = {
  args: {
    typeVariant: 'primary',
    state: 'default',
    size: 48,
    children: '선택하기',
  },
};

// Primary Variants
export const PrimaryVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button typeVariant="primary" state="default" size={48}>
        선택하기
      </Button>
      <Button typeVariant="primary" state="hover" size={48}>
        선택하기
      </Button>
      <Button typeVariant="primary" state="pressed" size={48}>
        선택하기
      </Button>
      <Button typeVariant="primary" state="disabled" size={48}>
        선택하기
      </Button>
    </div>
  ),
};

// Secondary Variants
export const SecondaryVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button typeVariant="secondary" state="default" size={48}>
        선택하기
      </Button>
      <Button typeVariant="secondary" state="hover" size={48}>
        선택하기
      </Button>
      <Button typeVariant="secondary" state="pressed" size={48}>
        선택하기
      </Button>
      <Button typeVariant="secondary" state="disabled" size={48}>
        선택하기
      </Button>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button typeVariant="primary" state="default" size={36}>
        선택하기 (36px)
      </Button>
      <Button typeVariant="primary" state="default" size={48}>
        선택하기 (48px)
      </Button>
    </div>
  ),
};
