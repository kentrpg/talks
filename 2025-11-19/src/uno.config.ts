import config from '@slidev/client/uno.config.ts'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    variants: [
      ...(config.variants ?? []),
    ],
    safelist: [
      'i-devicon:typescript',
      'forward:duration-slow',
      'forward:duration-slow-sub',
    ],
    shortcuts: {
      'duration-slow-sub': 'duration-slow delay-200',
      'title-delay': 'translate-y-[13rem] important-text-[3em]',
      'hstack-left': '!left-42% translate-x--42% !top-58 !w-30 !h-30',
      'hstack-right': '!left-58% translate-x--58% !top-58 !w-30 !h-30',
    },
    presets: [
      presetWebFonts({
        fonts: {
          sans: 'Styrene Display',
          cn: 'Noto Serif SC',
          hand: 'Playwrite IT Moderna',
        },
      }),
    ],
    rules: [
      // ['left-50%', { left: '50% !important' }],
      ['grid-rows-max-1fr', { 'grid-template-rows': 'max-content 1fr !important' }],
      ['duration-slow', { 'transition-duration': '400ms !important' }],
      // 支援 grid-rows-[max-content_1fr] 加上 !important
      [/^grid-rows-\[(.+)\]$/, ([, d]) => ({
        'grid-template-rows': `${d.replace(/_/g, ' ')} !important`,
      })],
    ],
  },
])