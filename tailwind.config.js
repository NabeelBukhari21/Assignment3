// tailwind.config.js
module.exports = {
  content: [
      './public/**/*.html',
  ],
  theme: {
      extend: {
          fontFamily: {
              'sans': ['ui-sans-serif', 'system-ui'],
              'serif': ['ui-serif', 'Georgia'],
              'mono': ['ui-monospace', 'SFMono-Regular'],
          },
      },
  },
  plugins: [
      require('@tailwindcss/typography'),
      require('daisyui'),
  ],
}
