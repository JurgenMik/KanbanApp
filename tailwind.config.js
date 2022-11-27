const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans' : ['Jost', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}