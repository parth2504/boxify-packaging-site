/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ADB5',
          dark: '#222831',
          gray: '#393E46',
          light: '#EEEEEE',
          50: '#E0F7F8',
          100: '#B3ECF0',
          200: '#80E0E6',
          300: '#4DD4DC',
          400: '#26C8D3',
          500: '#00ADB5',
          600: '#00A0A8',
          700: '#009198',
          800: '#008288',
          900: '#00666B',
        },
        accent: {
          DEFAULT: '#00ADB5',
          50: '#E0F7F8',
          100: '#B3ECF0',
          200: '#80E0E6',
          300: '#4DD4DC',
          400: '#26C8D3',
          500: '#00ADB5',
          600: '#00A0A8',
          700: '#009198',
          800: '#008288',
          900: '#00666B',
        },
        dark: '#222831',
        'dark-gray': '#393E46',
        light: '#EEEEEE',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero-bg.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};