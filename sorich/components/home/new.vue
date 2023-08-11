<template>
    <div>
        <section class="new">
            <h2 class="new-heading">NOVÁ KOLEKCIA</h2>
            <Swiper
                class="new-swiper"
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
                    <NuxtLink class="swiper-product" :to="`/products/${product.id}`">
                        <nuxt-img class="swiper-product-img" :src="product.thumbnail" alt="product-image"/>
                        <p class="swiper-product-title">{{ product.title }}</p>
                        <p class="swiper-product-price">
                            {{ product.variants[0] ? (product.variants[0].prices[0].amount/100).toFixed(2) : "" }}
                            {{ product.variants[0] ? product.variants[0].prices[0].currency_code.toUpperCase() : "" }}
                        </p>
                    </NuxtLink>
                </SwiperSlide>
            </Swiper>
        </section>
    </div>
</template>

<script setup>
    const medusaClient = useMedusaClient();

    const { collections } = await medusaClient.collections.list({
        handle: ["nova-kolekcia"],
    });

    const { products } = await medusaClient.products.list({
        collection_id: [collections[0].id],
    });
</script>

<style scoped>
    .new {
        position: relative;
        margin: 4rem 0;
        padding: 0 10%;
    }

    .new::after {
        --step: 2%;
        --thickness: 1px;
        --color: white;
        --offset: 20%;
        --_g: #0000 90deg,var(--color) 0;
        --_p: var(--offset) var(--offset) border-box no-repeat;

        content: "";
        width: calc(100% - var(--step)*2);
        height: calc(100% - 5rem);
        position: absolute;
        top: 2.5rem;
        left: var(--step);
        z-index: 1;
        pointer-events: none;
        border: var(--thickness) solid var(--color);
        border-top: var(--thickness) solid #0000;
        background:
            conic-gradient(from 90deg  at top var(--thickness) left  var(--thickness), var(--_g)) 0    0 / var(--_p),
            conic-gradient(from 180deg at top var(--thickness) right var(--thickness), var(--_g)) 100% 0 / var(--_p);
    }

    .new-heading {
        text-align: center;
        font-family: var(--black-font-family);
        font-size: 4rem;
    }

    .new-swiper {
        padding: 4rem 0 8rem 0;
    }

    @media only screen and (max-width: 1024px) {
        .new::after {
            --offset: 15%;
            top: 2rem;
        }

        .new-heading {
            font-size: 3rem;
        }

        .new-swiper {
            padding: 3rem 0 6rem 0;
        }
    }

    @media only screen and (max-width: 768px) {
        .new::after {
            --offset: 15%;
            top: 1.5rem;
        }

        .new-heading {
            font-size: 2rem;
        }

        .new-swiper {
            padding: 2rem 0 6rem 0;
        }
    }
</style>