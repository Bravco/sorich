<template>
    <div>
        <section class="discount">
            <h2 class="discount-heading">ZĽAVY</h2>
            <Swiper
                class="discount-swiper"
                :modules="[SwiperAutoplay]"
                :breakpoints="{
                    1280: { 
                        slidesPerView: 3,
                    },
                    1024: { 
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                }"
                :space-between="16"
                :centered-slides="true"
                :grab-cursor="true"
                :autoplay="{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                }"
            >
                <SwiperSlide v-for="product in products" :key="product.id">
                    <div class="swiper-product">
                        <nuxt-img class="swiper-product-img" :src="product.url" alt="product-image"/>
                        <p class="swiper-product-title">{{ product.title }}</p>
                        <p class="swiper-product-price">{{ formatPrice(product.price) }} EUR</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    </div>
</template>

<script lang="ts" setup>
    const { formatPrice } = useUtils();

    const products = [
        {
            id: 0,
            title: "SoRich Produkt 1",
            price: 1999,
            url: "/images/product.webp",
        },
        {
            id: 1,
            title: "SoRich Produkt 2",
            price: 1999,
            url: "/images/product.webp",
        },
        {
            id: 2,
            title: "SoRich Produkt 3",
            price: 1999,
            url: "/images/product.webp",
        },
    ];
</script>

<style scoped>
    .discount {
        position: relative;
        padding: 8rem 10% 8rem 0;
        background: linear-gradient(166deg, #B92323 0%, #521111 100%);
    }

    .discount-heading {
        position: absolute;
        top: 50%;
        translate: 0 -50%;
        font-family: var(--black-font-family);
        font-size: 8rem;
        rotate: -90deg;
    }

    .discount-swiper {
        margin-left: 25%;
    }

    @media only screen and (max-width: 1480px) {
        .discount {
            padding: 6rem 10%;
        }

        .discount-heading {
            position: static;
            text-align: center;
            rotate: unset;
            font-size: 6rem;
        }

        .discount-swiper {
            margin-left: unset;
        }
    }

    @media only screen and (max-width: 768px) {
        .discount-heading {
            font-size: 4rem;
        }
    }
</style>