<template>
    <div>
        <section class="main-wrapper">
            <NuxtLink class="return-link" to="/products">
                <Icon name="mdi:arrow-left"/>
                Vrátiť sa do obchodu
            </NuxtLink>
            <div class="imgs-wrapper">
                <div class="img-options">
                    <nuxt-img
                        v-for="(image, index) in product.images" 
                        :key="image.id"
                        @click="carouselIndex = index"
                        class="option-img" 
                        :src="image.url" 
                        alt="product-image"
                    />
                </div>
                <v-carousel v-model:model-value="carouselIndex" height="100%" hide-delimiters :continuous="false">
                    <v-carousel-item
                        v-for="image in product.images"
                        :key="image.id"
                        :src="image.url"
                        cover
                    ></v-carousel-item>
                </v-carousel>
            </div>
            <div class="content-wrapper">
                <div class="product-heading">
                    <h1 class="product-title">{{ product.title }}</h1>
                    <p class="product-description">{{ product.description }}</p>
                </div>
                <span class="product-price">
                    {{ product.variants[0] ? (product.variants[0].prices[0].amount/100).toFixed(2) : "" }}
                    {{ product.variants[0] ? product.variants[0].prices[0].currency_code.toUpperCase() : "" }}
                </span>
                <button class="add-to-cart-btn" :aria-label="`Add ${product.title} to cart`">Pridať do košíka</button>
            </div>
        </section>
    </div>
</template>

<script setup>
    const { id: productId } = useRoute().params;
    const medusaClient = useMedusaClient();

    const { product } = await medusaClient.products.retrieve(productId);

    const carouselIndex = ref(0);
</script>

<style scoped>
    .main-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        padding: 6rem 10%;
    }

    .return-link {
        grid-column: span 2;
    }

    .imgs-wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
    }

    .img-options {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .option-img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
        padding: 2rem 0;
    }

    .product-heading {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .product-title {
        font-size: 2rem;
    }

    .product-description {
        font-size: 1.125rem;
    }

    .product-price {
        font-family: var(--default-condensed-font-family);
        font-size: 3rem;
        font-weight: bold;
        color: var(--color-primary);
    }

    .add-to-cart-btn {
        padding: .5rem 1.5rem;
        font-size: 1.25rem;
        font-weight: bold;
        border: 2px solid white;
        border-radius: .5rem;
        transition-property: border-color, background-color;
        transition-duration: 300ms;
    }

    .add-to-cart-btn:hover {
        filter: none;
        border-color: var(--color-primary);
        background-color: var(--color-primary);
    }

    @media only screen and (max-width: 1280px) {
        .imgs-wrapper {
            grid-template-columns: 1fr;
        }

        .img-options {
            flex-direction: row;
            flex-wrap: wrap;
            order: 1;
        }
    }

    @media only screen and (max-width: 1024px) {
        .main-wrapper {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .return-link {
            grid-column: auto;
        }
    }
</style>