/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './_pages/**/*.{md,html}',
    './*.{md,html}',
    './_posts/**/*.{md,html}',
  ],
  theme: {
    extend: {
      // Кастомные цвета
      colors: {
        'brand-blue': '#004DFF',
        'brand-light': '#E7E7E7',
      },
      // Кастомные шрифты
      fontFamily: {
        sans: ['Geologica', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
    // Или выберите только нужные темы:
    // themes: ["light", "dark", "cyberpunk"],
    darkTheme: "dark", // Тема по умолчанию для темного режима
    base: true,
    styled: true,
    utils: true,
  },
}