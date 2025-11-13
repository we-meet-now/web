import plugin from 'tailwindcss/plugin'
import { colors, fontStack, typography } from './src/theme.ts'

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ...colors },
      fontFamily: { sans: fontStack.sans },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities: Record<string, Record<string, string>> = {}

      for (const [key, value] of Object.entries(typography)) {
        newUtilities[`.text-${key}`] = {
          fontSize: value.size,
          lineHeight: value.lh,
          letterSpacing: value.ls,
          fontWeight: String(value.weight),
        }
      }

      addUtilities(newUtilities)
    }),
  ],
}

export default config
