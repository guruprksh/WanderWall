/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        'cream': '#FAF7F2',
        'warm': '#F5EDD9',
        'paper': '#FDF6E3',
        'cork': '#C4956A',
        'tape': '#E8DFC0',
        'polaroid': '#FAFAFA',
        'ink': '#2C2C2C',
        'stamp': '#8B4513',
        'wanderblue': '#2D6A9F',
        'wandergreen': '#4A7C59',
        'wanderorange': '#D4704B',
        'wanderpurple': '#7B5EA7',
        'wanderpink': '#E8748A',
        'wandergold': '#D4AF37',
      },
      backgroundImage: {
        'cork-texture': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4956A' fill-opacity='0.15'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='20' cy='30' r='1.5'/%3E%3Ccircle cx='40' cy='30' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='30' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'stamp': 'stamp 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pin-drop': 'pinDrop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--tw-rotate, 0deg))' },
          '50%': { transform: 'translateY(-6px) rotate(var(--tw-rotate, 0deg))' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        stamp: {
          '0%': { transform: 'scale(1.5)', opacity: '0' },
          '50%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pinDrop: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'photo': '2px 2px 8px rgba(0,0,0,0.2), 4px 4px 20px rgba(0,0,0,0.1)',
        'polaroid': '3px 3px 12px rgba(0,0,0,0.15), 8px 8px 30px rgba(0,0,0,0.08)',
        'card': '0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12), 0 16px 48px rgba(0,0,0,0.08)',
        'pin': '2px 2px 6px rgba(0,0,0,0.3)',
        'floating': '0 20px 60px rgba(0,0,0,0.15)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
