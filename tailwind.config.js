/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '0.75rem'
      },
      center: true
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1296px',
      xl: '1440px'
    },
    extend: {
      backgroundImage: {
        logo: "url('/image/logo.png')",
        'logo-alt': "url('/image/logo-alt.png')",
        'banner-sm': "url('/image/banner-sm.png')",
        'intro-site-name': "url('/image/intro-site-name.png')",
        'icon-rolling-pin': "url('/image/icon-rolling-pin.png')",
        'video-demo': "url('/image/video-demo.png')",
        'course-1': "url('/image/course-1.png')",
        feature: "url('/image/feature.png')",
        'feature-center': "url('/image/feature-center.png')",
        'feature-icon-1': "url('/image/feature-icon-1.png')",
        'feature-icon-2': "url('/image/feature-icon-2.png')",
        'feature-icon-3': "url('/image/feature-icon-3.png')",
        'feature-icon-4': "url('/image/feature-icon-4.png')",
        'qa-sm': "url('/image/qa-sm.png')",
        'icon-fb': "url('/image/icon-fb.png')",
        'icon-youtube': "url('/image/icon-youtube.png')",
        'icon-ig': "url('/image/icon-ig.png')"
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
          150: '#ECE9E9',
          200: '#D9D9D9',
          400: '#B7B7B7',
          500: '#757575',
          600: '#6F6F6F',
          800: '#3D3D3D',
          900: '#000000'
        },
        success: {
          50: 'rgb(132 204 22)'
        },
        warning: {
          50: 'rgb(251 191 36)'
        }
      },
      spacing: {
        0.5: '0.125rem',
        7.5: '1.875rem',
        11: '2.75rem',
        12.5: '3.125rem',
        13: '3.25rem',
        13.5: '3.375rem',
        14: '3.5rem',
        15: '3.75rem',
        19: '4.75rem',
        22: '5.5rem',
        25: '6.25rem',
        27: '6.75rem',
        29: '7.25rem',
        30: '7.5rem',
        36.5: '9.125rem',
        39: '9.75rem',
        41: '10.25rem',
        61.5: '15.375rem',
        65: '16.25rem',
        70: '17.5rem',
        73: '18.25rem',
        76: '19rem',
        94: '23.5rem',
        104: '26rem',
        123: '30.75rem',
        125: '31.25rem',
        145: '36.25rem'
      },
      width: {
        33: '8.25rem'
      },
      minWidth: {
        19: '4.75rem'
      },
      maxWidth: {
        214: '53.5rem'
      },
      borderRadius: {
        '2.5xl': '20px'
      }
    },
    fontSize: {
      xs: ['12px'],
      sm: ['14px', '21px'],
      base: ['16px', '24px'],
      lg: ['20px', '30px'],
      xl: ['24px', '36px'],
      '2xl': ['28px', '42px'],
      '3xl': ['32px', '48px'],
      '4xl': ['40px', '60px'],
      'temporary-1': ['72px', '72px'],
      'qa-title': ['18px', '22px'],
      'heading-base': ['14px', '19.2px'],
      'heading-lg': ['20px', '24px'],
      'heading-xl': ['24px', '28.8px'],
      'heading-2xl': ['28px', '33.6px'],
      'heading-3xl': ['32px', '38.4px'],
      'heading-4xl': ['40px', '48px']
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
