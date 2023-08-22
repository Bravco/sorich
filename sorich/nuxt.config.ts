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
    head: {
      htmlAttrs: {
        lang: "sk",
      },
      meta: [
        {
          name: "robots",
          content: "robots: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "author",
          content: "SoRich",
        },
        {
          name: "title",
          content: "SoRich SHOP",
        },
        {
          name: "description",
          content: "SoRich módny eshop, streetwear s roznym štýlovým oblečením a doplnkami.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: "SoRich s.r.o.",
        },
        {
          property: "og:url",
          content: "https://www.sorich.sk",
        },
        {
          property: "og:title",
          content: "SoRich SHOP",
        },
        {
          property: "og:description",
          content: "SoRich módny eshop, streetwear s roznym štýlovým oblečením a doplnkami.",
        },
        {
          property: "og:image",
          content: "/images/home.webp",
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "twitter:title",
          content: "SoRich SHOP",
        },
        {
          property: "twitter:description",
          content: "SoRich módny eshop, streetwear s roznym štýlovým oblečením a doplnkami.",
        },
        {
          property: "twitter:image",
          content: "/images/home.webp",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      STRIPE_KEY: process.env.STRIPE_KEY,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      SENDGRID_FROM: process.env.SENDGRID_FROM,
      SENDGRID_ORDER_PLACED_TEMPLATE_ID: process.env.SENDGRID_ORDER_PLACED_TEMPLATE_ID,
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
})