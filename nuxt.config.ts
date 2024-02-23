// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt3'
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
    googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
  },
  router: {},
  // css: ['~/assets/main'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-headlessui',
    // '@googleapis',
    // '@kyvg/vue3-notification',
  ],
  headlessui: {
    prefix: 'Headless',
  },
  // serverMiddleware: ['~/api/database'],
  // plugins: ['~/plugins/vue3-notification.ts', '~/plugins/v-calendar.ts'],
})
// module.exports = {
//   serverMiddleware: ['~/api/database'],
// }
