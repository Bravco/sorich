// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-medusa",
    "nuxt-icon",
    "@nuxt/image",
    "@invictus.codes/nuxt-vuetify",
    "nuxt-swiper",
    "nuxt-lodash",
  ],
  css: [
    "@/assets/main.css",
    "@/assets/swiperSlide.css",
  ],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
})