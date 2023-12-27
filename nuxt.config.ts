// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt3'
console.log(process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID)
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
    googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
  },
  // css: ['~/assets/main'],
  modules: [
    // ...
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    // 'googleapis',
    // '@kyvg/vue3-notification',
  ],
  // plugins: ['~/plugins/notification.js'],
})
