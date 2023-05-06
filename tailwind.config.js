/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '0.75rem'
      }
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1920px'
    },
    extend: {
      backgroundImage: {
        logo: "url('/image/logo.png')",
        'banner-sm': "url('/image/banner-sm.png')",
        'intro-site-name': "url('/image/intro-site-name.png')",
        'icon-rolling-pin': "url('/image/icon-rolling-pin.png')",
        'video-demo': "url('/image/video-demo.png')",
        'course-1': "url('/image/course-1.png')",
        feature: "url('/image/feature.png')"
      },
      colors: {
        primary: {
          1: '#FFFAEC',
          2: '#F8E585',
          3: '#F3DA82',
          4: '#BD8964',
          5: '#816856',
          6: '#4B3828'
        },
        secondary: {
          1: '#F8F7F5',
          2: '#B8E1DD'
        },
        neutral: {
          50: '#FFFFFF',
          100: '#F3F3F3',
          200: '#D9D9D9',
          400: '#B7B7B7',
          600: '#6F6F6F',
          800: '#3D3D3D',
          900: '#000000'
        }
      },
      spacing: {
        13: '3.25rem',
        13.5: '3.375rem',
        25: '6.25rem',
        27: '6.75rem',
        39: '9.75rem',
        41: '10.25rem',
        65: '16.25rem',
        70: '17.5rem',
        94: '23.5rem'
      },
      width: {
        33: '8.25rem'
      }
    },
    fontSize: {
      sm: ['14px', '21px'],
      base: ['16px', '24px'],
      lg: ['20px', '30px'],
      xl: ['24px', '36px'],
      '2xl': ['28px', '42px'],
      '3xl': ['32px', '48px'],
      '4xl': ['40px', '60px'],
      'temporary-1': ['72px', '72px'],
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
