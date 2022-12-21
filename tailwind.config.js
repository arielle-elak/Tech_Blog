/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./views/**/*.{handlebars,html,js}", "./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'body': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    colors: {
      'white': 'rgb(255,255,255)',
      'blue': 'rgb(0,255,210)',
      'purple': 'rgb(159,84,165)',
      'pink': 'rgb(235,63,103)',
      'orange': 'rgb(244,159,64)',
      'green': 'rgb(112,247,145)',
      'yellow': 'rgb(248,238,0)',
      'gray-dark': 'rgb(13,13,12)',
      'gray': 'rgb(37,36,35)',
      'gray-light': 'rgb(109,109,109)',
      'gray-lighter': 'rgb(201,201,201)',
      'alt-blue': 'rgb(48,207,220)',
      'alt-pink': 'rgb(224,28,234)'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
