<template>
    <div>
        <section v-if="order" class="order-wrapper">
            <div class="order">
                <div class="heading">
                    <div>
                        <span>Ďakujeme</span>
                        <h1>Objednávka úspešná</h1>
                    </div>
                    <SuccessIcon/>
                </div>
                <ul class="product-list">
                    <li v-for="product in order.items" :key="product.id" class="product-item">
                        <nuxt-img class="product-img" :src="product.thumbnail" format="webp" alt="product-image"/>
                        <div class="product-description">
                            <h3 class="product-title">{{ product.title }}</h3>
                            <div class="product-value-wrapper">
                                <p class="product-value-title">Variant</p>
                                <span class="product-value">{{ product.description }}</span>
                            </div>
                            <div class="product-footer">
                                <div class="product-value-wrapper">
                                    <p class="product-value-title">Množstvo</p>
                                    <span class="product-value">{{ product.quantity }}</span>
                                </div>
                                <div class="footer-divider"/>
                                <div class="product-value-wrapper">
                                    <p class="product-value-title">Cena</p>
                                    <span class="product-value">
                                        {{ formatPrice(product.total) }}
                                        {{ order.currency_code.toUpperCase() }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="summary">
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Medzisúčet</p>
                        <p class="summary-price">
                            {{ formatPrice(order.subtotal) }}
                            {{ order.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <div class="summary-lineitem">
                        <p>Zľavy</p>
                        <p class="summary-price">
                            - {{ formatPrice(order.discount_total) }}
                            {{ order.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <div class="summary-lineitem">
                        <p>Doprava</p>
                        <p class="summary-price">
                            {{ formatPrice(order.shipping_total) }}
                            {{ order.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Celkovo</p>
                        <p class="summary-price">
                            {{ formatPrice(order.total) }}
                            {{ order.currency_code.toUpperCase() }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    useHead({
        title: "SoRich | Objednávka",
    });

    const { order_id } = useRoute().params;
    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();

    const order = ref<any>(null);

    medusaClient.orders.retrieve(order_id as string)
        .then(({ order: fetchedOrder }) => order.value = fetchedOrder)
        .catch(() => {
            navigateTo("/");
        });
</script>

<style scoped>
    .order-wrapper {
        padding: 6rem var(--main-horizontal-padding);
    }

    .order {
        width: fit-content;
        margin: 0 auto;
        padding: 1rem 2rem;
        border: 1px solid rgba(255, 255, 255, .25);
        border-radius: .5rem;
        background-color: rgba(0, 0, 0, .25);
    }

    .heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .product-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;
    }

    .product-item {
        display: flex;
    }

    .product-img {
        height: 12rem;
        aspect-ratio: 1/1;
        object-fit: cover;
        object-position: center;
    }

    .product-description {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }

    .product-value-wrapper {
        display: flex;
        gap: .5rem;
    }

    .product-value-title {
        color: rgba(255, 255, 255, .5);
    }

    .product-value {
        font-weight: 500;
    }

    .product-footer {
        display: flex;
        gap: 1rem;
        margin-top: auto;
    }

    .footer-divider {
        width: 1px;
        height: 100%;
        background-color: white;
    }

    .summary {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .summary-divider {
        border-color: rgba(255, 255, 255, .25);
    }

    .summary-lineitem {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .summary-price {
        font-weight: 500;
    }

    @media only screen and (max-width: 768px) {
        .product-item {
            flex-direction: column;
        }
    }
</style>