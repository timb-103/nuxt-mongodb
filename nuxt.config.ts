export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  runtimeConfig: {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    MONGO_DB: process.env.MONGO_DB,
  },
})
