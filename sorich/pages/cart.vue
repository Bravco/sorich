<template>
    <div>
        <section v-if="cart().value" class="wrapper">
            <h1 class="heading">Nákupný košík</h1>
            <div class="cart">
                <ul v-if="Object.keys(cart().value.items).length !== 0" class="product-list">
                    <li v-for="product in cart().value.items" :key="product.id" class="product-item">
                        <nuxt-img class="product-img" :src="product.thumbnail" format="webp" alt="product-image"/>
                        <div class="product-description">
                            <h3 class="product-title">{{ product.title }}</h3>
                            <div class="product-variant">
                                <p class="product-variant-title">Variant</p>
                                <span class="product-variant-value">{{ product.description }}</span>
                            </div>
                            <p class="product-price">
                                {{ formatPrice(product.total) }}
                                {{ cart().value.region.currency_code.toUpperCase() }}
                            </p>
                            <div class="product-description-actions">
                                <Quantity
                                    v-model="product.quantity"
                                    @update:model-value="(value) => updateLineItemQuantity(cart().value.id, product.id, value)" 
                                />
                                <button
                                    @click.prevent="deleteLineItem(cart().value.id, product.id)"
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
                    <div class="summary-lineitem">
                        <h1>Kupóny</h1>
                        <Icon v-if="discountLoading" name="svg-spinners:90-ring-with-bg" size="1.5rem"/>
                    </div>
                    <input v-model="discountCode" class="coupon-input" type="text" placeholder="Zadaj kód kupónu...">
                    <button @click="applyDiscount" class="coupon-btn" aria-label="Aplikuj kupón">Aplikuj</button>
                </div>
                <div class="sidebar-box">
                    <h1>Zhrnutie objednávky</h1>
                    <hr v-if="Object.keys(cart().value.items).length !== 0" class="summary-divider">
                    <div v-for="product in cart().value.items" :key="product.id" class="summary-lineitem">
                        <p>{{ product.quantity + "x" }} {{ product.title }}</p>
                        <p class="summary-price">
                            {{ formatPrice(product.total) }}
                            {{ cart().value.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Medzisúčet</p>
                        <p class="summary-price">
                            {{ formatPrice(cart().value.subtotal) }}
                            {{ cart().value.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <div class="summary-lineitem">
                        <p>Zľavy</p>
                        <p class="summary-price">
                            - {{ formatPrice(cart().value.discount_total) }}
                            {{ cart().value.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Celkovo</p>
                        <p class="summary-price">
                            {{ formatPrice(cart().value.total) }}
                            {{ cart().value.region.currency_code.toUpperCase() }}
                        </p>
                    </div>
                    <NuxtLink class="checkout-link" to="/checkout">Pokladňa</NuxtLink>
                </div>
            </aside>
        </section>
    </div>
</template>

<script lang="ts" setup>
    useHead({
        title: "SoRich | Nákupný Košík",
    });

    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();
    const { cart, setCart } = useCart();

    const discountCode = ref<string | null>(null);
    const discountLoading = ref<boolean>(false);
    
    const updateLineItemQuantity = useDebounce(function(cartId, lineItemId, quantity) {
        medusaClient.carts.lineItems.update(cartId, lineItemId, {
            quantity: quantity,
        }).then(({ cart: updatedCart }) => setCart(updatedCart));
    }, 500);

    function deleteLineItem(cartId : string, lineItemId : string) {
        medusaClient.carts.lineItems.delete(cartId, lineItemId)
        .then(({ cart: updatedCart }) => setCart(updatedCart));
    }

    function applyDiscount() {
        if (cart().value && discountCode.value) {
            discountLoading.value = true;
            medusaClient.carts.update(cart().value.id, {
                discounts: [
                    { code: discountCode.value },
                ],
            }).then(({ cart: updatedCart }) => {
                setCart(updatedCart);
                discountCode.value = null;
                discountLoading.value = false;
            }).catch(() => {
                alert("Kupón neexistuje");
                discountLoading.value = false;
            });
        }
    }
</script>

<style scoped>
    .wrapper {
        display: grid;
        -webkit-box-align: start;
        align-items: start;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        padding: 6rem var(--main-horizontal-padding);
    }

    .heading {
        grid-column: 1 / span 2;
    }

    .product-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .product-item {
        display: flex;
        border: 1px solid rgba(255, 255, 255, .25);
        border-radius: .5rem;
        background-color: rgba(0, 0, 0, .25);
    }

    .product-img {
        height: 16rem;
        aspect-ratio: 1/1;
        object-fit: cover;
        object-position: center;
        border-radius: .5rem 0 0 .5rem;
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

    .sidebar, .sidebar-box {
        display: flex;
        flex-direction: column;
        gap: 1rem;
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
        background-color: rgba(0, 0, 0, .25);
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

    .checkout-link, .coupon-btn {
        width: 100%;
        padding: .5rem 0;
        border-radius: .5rem;
    }

    .checkout-link {
        text-align: center;
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
        .heading {
            grid-column: auto;
        }

        .wrapper {
            grid-template-columns: 1fr;
        }

        .sidebar {
            position: static;
            top: 6rem;
        }
    }

    @media only screen and (max-width: 768px) {
        .product-item {
            flex-direction: column;
        }

        .product-img {
            height: 12rem;
            aspect-ratio: unset;
            border-radius: .5rem .5rem 0  0;
        }
        
        .product-description-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: .5rem;
        }
    }
</style>