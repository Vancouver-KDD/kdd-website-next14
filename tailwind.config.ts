import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import colors from 'tailwindcss/colors'

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '414px', // iPhone 6/7/8 Plus, iPhone 11, 11 Pro Max, iPhone XS Max, iPhone XR and for 428px iPhone 12 Pro Max, iPhone 13 Pro Max
      sm: '600px', // Galaxy Tab 2 7"
      md: '768px', // iPad Pro 9.7", iPad Mini
      lg: '1024px', // iPad Pro 12.9"
      xl: '1280px', // Macbook 12"
      '2xl': '1440px', // Macbook Pro 13", Macbook Air 13"
      '3xl': '1680px', // Macbook Pro 15"
    },
    extend: {
      colors: {
        gray: colors.neutral,
        radicalRed: {
          50: '#ffe6eb',
          100: '#ffccd8',
          200: '#ffccd8',
          300: '#ff6b92',
          400: '#fc4678',
          500: '#f52763',
          600: '#ce214f',
          700: '#a61d3e',
          800: '#7f1a30',
          900: '#581522',
        },
        royalBlue: {
          50: '#e8efff',
          100: '#d8e3ff',
          200: '#b9c5ff',
          300: '#939eff',
          400: '#747cf8',
          500: '#5d5fef',
          600: '#3d47c5',
          700: '#26379c',
          800: '#162972',
          900: '#0b1c48',
        },
      },
      textShadow: {
        default: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
        sm: '1px 1px 3px rgb(36 37 47 / 25%)',
        md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
        lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
        xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
        none: 'none',
      },
    },
  },
  plugins: [
    plugin(function ({addBase, addComponents, matchUtilities, theme}) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {values: theme('textShadow')}
      )
      addBase({
        '.flex-col': {
          display: 'flex',
        },
        '.flex-row': {
          display: 'flex',
        },
        '.debug': {
          'outline-width': '2px',
          'outline-color': 'pink',
          'outline-style': 'dashed',
        },
      })
      addComponents({
        '.flex-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        },
      })
    }),
  ],
})
export default config
