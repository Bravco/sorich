<template>
    <div>
        <Hero/>
        <section class="new">
            <h2 class="new-heading">NOVÁ KOLEKCIA</h2>
            <Swiper
                class="new-swiper"
                :modules="[SwiperAutoplay]"
                :breakpoints="{
                    1480: { slidesPerView: 3 },
                    1024: { slidesPerView: 2 },
                }"
                :slides-per-view="1"
                :centered-slides="true"
                :grab-cursor="true"
                :autoplay="{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                }"
            >
                <SwiperSlide v-for="(item, index) in newCollection" :key="index">
                    <div class="product">
                        <nuxt-img class="product-img" :src="item.url" alt="product-image"/>
                        <span class="new-product-title">{{ item.title }}</span>
                        <span class="product-price">{{ (item.price/100).toFixed(2) }}</span>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    </div>
</template>

<script setup>
    const newCollection = [
        {
            title: "SoRich Produkt 1",
            price: "1999",
            url: "/images/product.webp",
        },
        {
            title: "SoRich Produkt 2",
            price: "1999",
            url: "/images/product.webp",
        },
        {
            title: "SoRich Produkt 3",
            price: "1999",
            url: "/images/product.webp",
        },
    ];
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
        --offset: 5%;
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
    
    .product {
        aspect-ratio: 1/1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem;
        position: relative;
        margin: 0 2rem;
        color: black;
        background-color: white;
        z-index: -1;
    }

    .product-img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        object-position: center;
        z-index: -1;
    }

    .product-title, .product-price {
        font-family: var(--default-condensed-font-family);
        text-shadow: 0px -2px 4px white;
    }

    .product-title {
        font-size: 2.5rem;
        font-weight: bold;
    }

    .product-price {
        font-size: 2rem;
        font-weight: 500;
        color: var(--color-primary);
    }

    .product-price::before {
        content: "€ ";
    }
</style>