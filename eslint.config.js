import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    react: false,
    pnpm: true,
    markdown: true,
    formatters: {
      css: true,
      markdown: 'prettier',
      slidev: {
        files: [
          '*/src/slides.md',
        ],
      },
    },
    ignores: [
      '**/demo/eslint/**',
    ],
  },
  // From the second arguments they are ESLint Flat Configs
  {
    rules: {
      'style/eol-last': ['error', 'never'],
      'format/prettier': 'off',
    },
  },
  {
    files: ['**/*.md/**/*.js', '**/*.md/**/*.ts', '**/*.md/**/*.jsx', '**/*.md/**/*.tsx', '**/*.md/**/*.md'],
    rules: {
      'style/eol-last': 'off',
    },
  },
)