/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': '#1154A3',
        'color-secondary': '#DA753C',
        'color-neutrals': '#1B1C1E',
        'color-body': '#3B3C3F',
        'color-gray': '#B6B7B9',
        'color-gray-light': '#F2F3F6',
        'color-border': '#D9DADD',
        'color-text-muted': '#5A5B5D',
        'sky-blue': '#3b82f6'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        sm: ['14px', '18px'],
        md: ['16px', '20px'],
        base: ['18px', '24px'],
        lg: ['20px', '28px'],
        heading1: ['36px', '48px'],
      },
      boxShadow: {
        'md': '0 8px 22px 2px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        lg: '8px',
        'tr-lg': '8px 0 0 0', // top-right
        'br-lg': '0 0 8px 0',  // bottom-right
      },
      spacing: {
        4: '16px',
        3: '12px',
      },
      borderWidth: {
        1: '1px',
      },
      minHeight: {
        '472': '472px',
        '364': '364px'
      },
      screens: {
        sm: { max: '640px' },
        md: { max: '768px' },
        lg: { max: '1024px' },
        xl: { max: '1280px' },
        '2xl': { max: '1536px' },
      }
    },
  },
  plugins: [],
}