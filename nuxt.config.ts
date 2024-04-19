// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt'
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
    // '@googleapis',
    'nuxt-headlessui',
    // '@kyvg/vue3-notification',
    // '~/plugins/database.js',
  ],
  nitro: {
    // plugins: ['~/plugins/database.js'],
  },
  // plugins: ['~/plugins/database.js'],
  // headlessui: {
  //   prefix: 'Headless',
  // },
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000,
  // },
  // server: {
  //   port: 3000,
  // },

  // serverMiddleware: ['~/api/database'],
  // plugins: ['~/plugins/vue3-notification.ts', '~/plugins/v-calendar.ts'],
})
// module.exports = {
//   serverMiddleware: ['~/api/database'],
// }
