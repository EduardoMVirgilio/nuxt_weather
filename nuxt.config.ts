// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/ui"],
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    NUXT_OPENWEATHERMAP_KEY: process.env.NUXT_OPENWEATHERMAP_KEY,
  },
});
