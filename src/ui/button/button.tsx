import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonType = 'primary' | 'secondary';
type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';
type ButtonSize = 36 | 48;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  typeVariant?: ButtonType;
  state?: ButtonState;
  size?: ButtonSize;
  children: ReactNode;
}

export const Button = ({
  typeVariant = 'primary',
  state = 'default',
  size = 48,
  children,
  className,
  ...restProps
}: ButtonProps) => {
  const baseStyles =
    'rounded-lg font-medium transition-colors duration-200 flex items-center justify-center';

  // 높이별 padding
  const sizeStyles: Record<ButtonSize, string> = {
    36: 'h-9 px-4 text-sm', // 36px
    48: 'w-[320px] h-[48px] text-head-2', // 48px
  };

  // 색상 variant
  const typeStyles: Record<ButtonType, Record<ButtonState, string>> = {
    primary: {
      default: 'bg-blue-500 text-white hover:bg-blue-400',
      hover: 'bg-blue-400 text-white',
      pressed: 'bg-blue-700 text-white',
      disabled: 'bg-blue-200 text-white cursor-not-allowed opacity-60',
    },
    secondary: {
      default: 'bg-gray-300 text-gray-800 hover:bg-gray-200',
      hover: 'bg-gray-200 text-gray-800',
      pressed: 'bg-gray-600 text-white',
      disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60',
    },
  };

  const classes = clsx(
    baseStyles,
    sizeStyles[size],
    typeStyles[typeVariant][state],
    className,
  );

  return (
    <button className={classes} disabled={state === 'disabled'} {...restProps}>
      {children}
    </button>
  );
};
