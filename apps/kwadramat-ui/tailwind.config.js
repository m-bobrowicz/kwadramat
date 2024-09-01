const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter;',
      },
      animation: {
        'indeterminate-progress':
          'indeterminate-progress 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
        'indeterminate-progress-short':
          'indeterminate-progress-short 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
      },
      keyframes: {
        'indeterminate-progress': {
          '100%': { left: '-35%', right: '100%' },
          '60%': { left: '100%', right: '-90%' },
          '0%': { left: '100%', right: '-90%' },
        },
        'indeterminate-progress-short': {
          '100%': { left: '-200%', right: '100%' },
          '60%': { left: '107%', right: '-8%' },
          '0%': { left: '107%', right: '-8%' },
        },
      },
    },
  },
};
