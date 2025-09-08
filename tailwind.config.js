/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // 1930s sepia color palette inspired by Raiders/Tarzan
        sepia: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cdc2',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        vintage: {
          cream: '#f5f1e8',
          tan: '#d4c4a8',
          brown: '#8b7355',
          dark: '#3d2914',
          gold: '#b8860b',
          copper: '#b87333',
          parchment: '#f4f1e8',
          aged: '#d2c4a8',
        },
        // Adventure/Explorer theme colors
        adventure: {
          jungle: '#2d5016',
          sand: '#c2b280',
          stone: '#8b8680',
          rust: '#b7410e',
        }
      },
      fontFamily: {
        'vintage': ['Georgia', 'Times New Roman', 'serif'],
        'headline': ['Impact', 'Arial Black', 'sans-serif'],
        'typewriter': ['Courier New', 'monospace'],
        'adventure': ['Georgia', 'serif'],
      },
      fontSize: {
        'vintage-xs': ['0.75rem', { lineHeight: '1.2' }],
        'vintage-sm': ['0.875rem', { lineHeight: '1.3' }],
        'vintage-base': ['1rem', { lineHeight: '1.4' }],
        'vintage-lg': ['1.125rem', { lineHeight: '1.4' }],
        'vintage-xl': ['1.25rem', { lineHeight: '1.3' }],
        'vintage-2xl': ['1.5rem', { lineHeight: '1.2' }],
        'vintage-3xl': ['1.875rem', { lineHeight: '1.1' }],
        'vintage-4xl': ['2.25rem', { lineHeight: '1' }],
      },
      spacing: {
        'vintage': '0.75rem',
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'vintage': '0.25rem',
        'none': '0',
      },
      boxShadow: {
        'vintage': '0 4px 6px -1px rgba(61, 41, 20, 0.1), 0 2px 4px -1px rgba(61, 41, 20, 0.06)',
        'vintage-lg': '0 10px 15px -3px rgba(61, 41, 20, 0.1), 0 4px 6px -2px rgba(61, 41, 20, 0.05)',
        'vintage-xl': '0 20px 25px -5px rgba(61, 41, 20, 0.1), 0 10px 10px -5px rgba(61, 41, 20, 0.04)',
        'inner-vintage': 'inset 0 2px 4px 0 rgba(61, 41, 20, 0.06)',
      },
      backgroundImage: {
        'vintage-paper': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23f5f1e8\"/><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"%23d4c4a8\" opacity=\"0.3\"/><circle cx=\"80\" cy=\"80\" r=\"1\" fill=\"%23d4c4a8\" opacity=\"0.3\"/><circle cx=\"60\" cy=\"30\" r=\"0.5\" fill=\"%23d4c4a8\" opacity=\"0.2\"/><circle cx=\"30\" cy=\"70\" r=\"0.5\" fill=\"%23d4c4a8\" opacity=\"0.2\"/></svg>')",
        'aged-paper': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23f4f1e8\"/><circle cx=\"15\" cy=\"15\" r=\"0.8\" fill=\"%23d2c4a8\" opacity=\"0.4\"/><circle cx=\"85\" cy=\"85\" r=\"0.8\" fill=\"%23d2c4a8\" opacity=\"0.4\"/><circle cx=\"70\" cy=\"25\" r=\"0.4\" fill=\"%23d2c4a8\" opacity=\"0.3\"/><circle cx=\"25\" cy=\"75\" r=\"0.4\" fill=\"%23d2c4a8\" opacity=\"0.3\"/><circle cx=\"50\" cy=\"50\" r=\"0.3\" fill=\"%23d2c4a8\" opacity=\"0.2\"/></svg>')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'typewriter': 'typewriter 2s steps(40) 1s 1 normal both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
