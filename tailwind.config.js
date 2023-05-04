/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontSize: {
      sm: ['14px', '21px'],
      base: ['16px', '24px'],
      lg: ['20px', '30px'],
      xl: ['24px', '36px'],
      '2xl': ['28px', '42px'],
      '3xl': ['32px', '48px'],
      '4xl': ['40px', '60px'],
      'heading-base': ['14px', '19.2px'],
      'heading-lg': ['20px', '24px'],
      'heading-xl': ['24px', '28.8px'],
      'heading-2xl': ['28px', '33.6px'],
      'heading-3xl': ['32px', '38.4px'],
      'heading-4xl': ['40px', '48px']
    }
  },
  plugins: []
}
