// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  ssr: false,
});
