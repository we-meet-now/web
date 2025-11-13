// src/theme.ts
export const colors = {
  blue: {
    100: '#E5F0F9',
    200: '#B2D6F7',
    300: '#82C3F7',
    400: '#47A9F7',
    500: '#0093FE',
    600: '#0D83E8',
    700: '#0071D6',
    800: '#005BA6',
    900: '#003E6A',
  },
  gray: {
    100: '#F2F5F7',
    200: '#D8DEE4',
    300: '#B9C1CC',
    400: '#97A1B0',
    500: '#717B8E',
    600: '#586174',
    700: '#434C61',
    800: '#2C3345',
    900: '#1E2432',
  },
  yellow: {
    100: '#FFFDD9',
    200: '#FFF4A2',
    300: '#FFED73',
    400: '#FFE533',
    500: '#FFD800',
    600: '#FFC800',
    700: '#BFA300',
    800: '#8A7600',
    900: '#6B5C00',
  },
} as const;

export const typography = {
  'title-1': { size: '22px', lh: '136%', ls: '-0.003em', weight: 700 },
  'title-2': { size: '20px', lh: '136%', ls: '-0.003em', weight: 700 },
  'head-1': { size: '18px', lh: '140%', ls: '-0.003em', weight: 600 },
  'head-2': { size: '16px', lh: '140%', ls: '-0.003em', weight: 600 },
  'head-3': { size: '16px', lh: '140%', ls: '-0.003em', weight: 400 },
  'body-1': { size: '16px', lh: '170%', ls: '-0.003em', weight: 400 },
  'body-2': { size: '14px', lh: '140%', ls: '-0.003em', weight: 600 },
  'body-3': { size: '14px', lh: '140%', ls: '-0.003em', weight: 400 },
  'body-4': { size: '12px', lh: '140%', ls: '-0.003em', weight: 700 },
  'body-5': { size: '12px', lh: '140%', ls: '-0.003em', weight: 400 },
  'caption-1': { size: '10px', lh: '140%', ls: '-0.003em', weight: 600 },
  'caption-2': { size: '10px', lh: '140%', ls: '-0.003em', weight: 400 },
} as const;

export const fontStack = {
  sans: ['"Pretendard"', 'sans-serif'],
} as const;

export type Theme = {
  colors: typeof colors;
  typography: typeof typography;
  fontStack: typeof fontStack;
};

export const theme: Theme = { colors, typography, fontStack };
export default theme;
