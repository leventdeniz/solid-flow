/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/colors/themes")["[data-theme=cupcake]"],
          "--rounded-btn": "0.5rem",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
        dark1: {
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
        dark2: {
          "primary": "#5834aa",
          "secondary": "#c2f2fc",
          "accent": "#e951f7",
          "neutral": "#221B27",
          "base-100": "#2F293D",
          "info": "#A2C2EC",
          "success": "#57D6C9",
          "warning": "#F5BF42",
          "error": "#E9354D",
        },
      },
      "dark"
    ],
  },
  plugins: [require('daisyui')],
};
