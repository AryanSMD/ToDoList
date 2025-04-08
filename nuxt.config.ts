// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/style.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'To Do List',
    }
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@pinia/nuxt',
  ]
})