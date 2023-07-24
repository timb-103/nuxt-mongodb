export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  runtimeConfig: {
    DB_CREDENTIALS: process.env.DB_CREDENTIALS,
  },
})
