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
      'style/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'format/prettier': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'style/brace-style': ['error', '1tbs'],
    },
  },
  {
    files: ['**/*.vue/*.css'],
    rules: {
      'style/eol-last': 'off',
    },
  },
  {
    files: ['**/*.md/**/*.js', '**/*.md/**/*.ts', '**/*.md/**/*.jsx', '**/*.md/**/*.tsx', '**/*.md/**/*.md', '**/*.md/**/*.yaml', '**/*.md/**/*.css'],
    rules: {
      'style/eol-last': 'off',
      'prefer-const': 'off',
      'ts/consistent-type-definitions': 'off',
    },
  },
)