/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        default: {
          'primary': '#c3aeef',
          'secondary': '#ecaded',
          'accent': '#66cc3b',
          'neutral': '#292239',
          'base-100': '#30315F',
          'info': '#2C50DD',
          'success': '#29C287',
          'warning': '#C69010',
          'error': '#FB133E',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
