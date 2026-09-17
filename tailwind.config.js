/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        desk: {
          light: '#F3E9D6',
          DEFAULT: '#EFE2CC',
          dark: '#DFCBA3',
          shadow: '#C9B182',
        },
        paper: {
          DEFAULT: '#FBF7EE',
          soft: '#F7F1E3',
          line: '#E4D9C4',
        },
        ink: {
          DEFAULT: '#332C22',
          soft: '#5C5344',
          faint: '#8A7F6E',
        },
        accent: {
          sky: '#AFC9DD',
          skyDeep: '#7FA0C4',
          clay: '#C97B5C',
          clayDeep: '#B2603F',
          moss: '#B8CBA3',
          mossDeep: '#93A97A',
          brass: '#A48A5C',
        },
        tape: {
          cream: 'rgba(246, 231, 168, 0.55)',
          sky: 'rgba(175, 201, 221, 0.5)',
          clay: 'rgba(201, 123, 92, 0.35)',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        hand: ['"Caveat"', '"Xiaolai"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        paper: '0 2px 6px rgba(51, 44, 34, 0.08), 0 8px 20px rgba(51, 44, 34, 0.08)',
        'paper-lg': '0 6px 16px rgba(51, 44, 34, 0.12), 0 20px 40px rgba(51, 44, 34, 0.14)',
        polaroid: '0 3px 8px rgba(51, 44, 34, 0.18), 0 1px 2px rgba(51, 44, 34, 0.12)',
        tab: '-3px 3px 8px rgba(51, 44, 34, 0.14)',
        notebook: '0 20px 50px rgba(51, 44, 34, 0.25), 0 8px 16px rgba(51, 44, 34, 0.15)',
        ring: 'inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.4)',
      },
      backgroundImage: {
        'paper-texture':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
        'desk-gradient':
          'radial-gradient(ellipse at 50% 0%, #F6EDDA 0%, #EFE2CC 45%, #DFCBA3 100%)',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatIn: 'floatIn 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
