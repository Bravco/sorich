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
                    <NuxtLink class="swiper-product" :to="`/products/${product.id}`">
                        <nuxt-img class="swiper-product-img" :src="product.thumbnail ?? undefined" format="webp" alt="product-image"/>
                        <p class="swiper-product-title">{{ product.title }}</p>
                        <div class="price-wrapper">
                            <p class="swiper-product-price">
                                {{ formatPrice(getSalePrice(product)?.amount) }}
                                {{ getSalePrice(product)?.currency_code.toUpperCase() }}
                            </p>
                            <p class="old-price swiper-product-price">
                                {{ product.variants[0] ? formatPrice(product.variants[0].prices[0].amount) : "" }}
                                {{ product.variants[0] ? product.variants[0].prices[0].currency_code.toUpperCase() : "" }}
                            </p>
                        </div>
                        <div class="sale-sticker">ZĽAVA</div>
                    </NuxtLink>
                </SwiperSlide>
            </Swiper>
        </section>
    </div>
</template>

<script lang="ts" setup>
    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();

    const products = (await medusaClient.products.list()).products.filter(product => {
        return product.variants.some(variant => {
            return variant.prices.some(price => price.price_list && price.price_list.type === "sale");
        });
    });

    function getSalePrice(product : any) {
        return product.variants[0].prices.find((price : any) => {
            if (price.price_list && price.price_list.type === "sale")
                return true;
        });
    }
</script>

<style scoped>
    .discount {
        position: relative;
        padding: 8rem var(--main-horizontal-padding) 8rem 0;
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

    

    .price-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .5rem;
        line-height: 1.5rem;
    }

    .old-price {
        position: relative;
        font-size: 1rem;
        color: black;
    }

    .old-price::after {
        content: "";
        width: 110%;
        height: 2px;
        position: absolute;
        top: 50%;
        left: -5%;
        background-color: red;
    }

    .sale-sticker {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: .5rem .75rem;
        line-height: 1rem;
        font-weight: bold;
        color: white;
        background-color: var(--color-primary);
        border-radius: 2rem;
    }

    @media only screen and (max-width: 1480px) {
        .discount {
            padding: 6rem var(--main-horizontal-padding);
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