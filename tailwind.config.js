/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./views/**/*.{handlebars,html,js}", "./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      body: ['Ubuntu', 'sans-serif']
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
