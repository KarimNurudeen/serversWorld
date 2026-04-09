import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1A2744',
        surface: '#233152',
        'surface-light': '#2d3d65',
        hint: '#3B4D71',
        'primary-text': '#FFFFFF',
        'secondary-text': '#B0B8C4',
        accent: '#E8E8E8',
        divider: 'rgba(255,255,255,0.15)',
        'sw-error': '#FF4B4B',
      },
      fontFamily: {
        primary: ['"Noto Sans JP"', 'sans-serif'],
        secondary: ['"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['34px', { lineHeight: '1.1', fontWeight: '700' }],
        'headline-md': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'title-lg': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        'title-md': ['17px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '1.3', fontWeight: '600' }],
        'label-md': ['12px', { lineHeight: '1.3', fontWeight: '600' }],
        'label-sm': ['10px', { lineHeight: '1.2', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '0px',
        DEFAULT: '2px',
        lg: '4px',
        full: '9999px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'smoke-shade': 'linear-gradient(180deg, #1A2744 0%, #233152 50%, #1A2744 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
