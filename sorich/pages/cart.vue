<template>
    <div>
        <section v-if="cart" class="wrapper">
            <div class="cart">
                <h1>Nákupný košík</h1>
                <ul v-if="Object.keys(cart.items).length !== 0" class="product-list">
                    <li v-for="product in cart.items" :key="product.id" class="product-item">
                        <nuxt-img class="product-img" :src="product.thumbnail" alt="product-image"/>
                        <div class="product-description">
                            <h3 class="product-title">{{ product.title }}</h3>
                            <div class="product-variant">
                                <p class="product-variant-title">Variant</p>
                                <span class="product-variant-value">{{ product.description }}</span>
                            </div>
                            <p class="product-price">
                                {{ formatPrice(product.total) }}
                                {{ cart.region.currency_code.toUpperCase() }}
                            </p>
                            <div class="product-description-actions">
                                <Quantity
                                    v-model="product.quantity"
                                    @update:model-value="(value) => updateLineItemQuantity(cart.id, product.id, value)" 
                                />
                                <button
                                    @click.prevent="deleteLineItem(cart.id, product.id)"
                                    class="product-remove-btn" 
                                    aria-label="Odstrániť produkt z košíka"
                                >
                                    Odstrániť z košíka
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
                <p v-else>V nákupnom košíku nie sú žiadne produkty.</p>
            </div>
            <aside class="sidebar">
                <div class="sidebar-box">
                    <h1>Kupóny</h1>
                    <input v-model="coupon" class="coupon-input" type="text" placeholder="Zadaj kód kupónu...">
                    <button @click="applyCoupon" class="coupon-btn" aria-label="Aplikuj kupón">Aplikuj</button>
                </div>
                <div class="sidebar-box">
                    <h1>Zhrnutie objednávky</h1>
                    <hr v-if="Object.keys(cart.items).length !== 0" class="summary-divider">
                    <div v-for="product in cart.items" :key="product.id" class="summary-lineitem">
                        <p>{{ product.title }}</p>
                        <p class="summary-price">
                            {{ formatPrice(product.total) }}
                            {{ cart.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Medzisúčet</p>
                        <p class="summary-price">
                            {{ formatPrice(cart.subtotal) }}
                            {{ cart.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <div class="summary-lineitem">
                        <p>Zľavy</p>
                        <p class="summary-price">
                            0.00 
                            {{ cart.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Celkovo</p>
                        <p class="summary-price">
                            {{ formatPrice(cart.total) }}
                            {{ cart.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <button class="checkout-btn" aria-label="Pokračovať k pokladni">Pokladňa</button>
                </div>
            </aside>
        </section>
    </div>
</template>

<script setup>
    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();
    const { cart, setCart } = useCart();

    const coupon = ref(null);

    function updateLineItemQuantity(cartId, lineItemId, quantity) {
        medusaClient.carts.lineItems.update(cartId, lineItemId, {
            quantity: quantity,
        }).then(({ cart: updatedCart }) => setCart(updatedCart));
    }

    function deleteLineItem(cartId, lineItemId) {
        medusaClient.carts.lineItems.delete(cartId, lineItemId)
        .then(({ cart: updatedCart }) => setCart(updatedCart));
    }

    function applyCoupon() { }
</script>

<style scoped>
    .wrapper {
        display: grid;
        -webkit-box-align: start;
        align-items: start;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        padding: 6rem 10%;
    }

    .cart, .sidebar, .sidebar-box {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .product-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .product-item {
        display: flex;
        background-color: rgba(0, 0, 0, .1);
    }

    .product-img {
        height: 16rem;
    }

    .product-description {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }

    .product-variant {
        display: flex;
        gap: .5rem;
    }

    .product-variant-title {
        color: rgba(255, 255, 255, .5);
    }

    .product-variant-value {
        font-weight: 500;
    }

    .product-price {
        font-family: var(--default-condensed-font-family);
        font-size: 2rem;
        font-weight: bold;
        color: var(--color-primary);
    }

    .product-description-actions {
        display: flex;
        margin-top: auto;
        align-items: flex-end;
        justify-content: space-between;
    }

    .product-remove-btn {
        text-decoration: underline;
        font-weight: bo;
        color: var(--color-primary);
    }

    .sidebar {
        position: sticky;
        top: 6rem;
    }

    .sidebar-box {
        height: fit-content;
        padding: 1rem 2rem;
        border: 1px solid rgba(255, 255, 255, .25);
        border-radius: .5rem;
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

    .checkout-btn, .coupon-btn {
        width: 100%;
        padding: .5rem 0;
        border-radius: .5rem;
    }

    .checkout-btn {
        font-size: 1.125rem;
        font-weight: bold;
        background-color: var(--color-primary);
    }

    .coupon-btn {
        border: 1px solid white;
    }

    .coupon-input {
        padding: .5rem 1rem;
        background-color: rgba(0, 0, 0, .25); 
        border-radius: .5rem;
    }

    @media only screen and (max-width: 1024px) {
        .wrapper {
            grid-template-columns: 1fr;
        }

        .sidebar {
            position: static;
            top: 6rem;
        }
    }
</style>