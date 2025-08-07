import config from '@slidev/client/uno.config.ts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    variants: [
      ...(config.variants ?? []),
    ],
    safelist: [
      'grid-rows-[max-content_1fr]',
      'translate-x-[17rem]',
      'translate-x-[12rem]',
    ],
    shortcuts: {
      'text-primary': 'text-hex-141413',
      'title-primary': 'text-hex-141413 font-bold',
      'subtitle-delay': 'duration-slow delay-200',
      'title-delay': 'translate-y-[13rem] scale-120',
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
      ['duration-slow', { 'transition-duration': '400ms !important' }],
      // 支援 grid-rows-[max-content_1fr] 加上 !important
      [/^grid-rows-\[(.+)\]$/, ([, d]) => ({
        'grid-template-rows': `${d.replace(/_/g, ' ')} !important`,
      })],
    ],
  },
])