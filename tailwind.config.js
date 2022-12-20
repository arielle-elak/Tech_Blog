/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ["./views/**/*.{handlebars,html,js}", "./public/**/*.{html,js}"],
    theme: {
      fontFamily: {
        'body': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms')
    ]
  }
