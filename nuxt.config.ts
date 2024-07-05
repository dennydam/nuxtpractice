// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt'
const path = require('path')
console.log('test')
export default defineNuxtConfig({
  devtools: { enabled: true },
  // nitro: {
  //   output: {
  //     publicDir: path.join(__dirname, 'docs'),
  //   },
  // },
  // server: {
  //   cors: {
  //     origin: 'https://dennydam.github.io',
  //     methods: ['GET', 'POST'],
  //     preflightContinue: false,
  //     optionsSuccessStatus: 204,
  //     maxAge: 86400,
  //     credentials: true,
  //   },
  // },
  app: {
    // baseURL: '/nuxtpractice/',
    buildAssetsDir: '/static/',
  },
  devServer: {
    // url: 'https://dennydam.github.io/nuxtpractice/',
    // port: 5000,
  },
  // CORS配置

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
