import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  theme: {
    container: {
      center: true,
    },
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      lightBg: 'var(--lightBg)',
      darkBg: 'var(--darkBg)',
      darkColor: 'var(--darkColor)',
      lightText: 'var(--lightText)',
      darkText: 'var(--darkText)',
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})