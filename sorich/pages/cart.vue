<template>
    <div>
        <section class="wrapper">
            <div class="cart">
                <h1>Nákupný košík</h1>
                <ul class="product-list">
                    <li v-for="_ in 3" class="product-item">
                        <nuxt-img class="product-img" src="/images/product.webp" alt="product-image"/>
                        <div class="product-description">
                            <h3 class="product-title">Product title</h3>
                            <ul>
                                <li class="product-option">
                                    <p class="product-option-title">Veľkosť</p>
                                    <span class="product-option-value">XL</span>
                                </li>
                                <li class="product-option">
                                    <p class="product-option-title">Farba</p>
                                    <span class="product-option-value">Čierna</span>
                                </li>
                            </ul>
                            <p class="product-price">99.99 EUR</p>
                            <div class="product-description-actions">
                                <Quantity/>
                                <button class="product-remove-btn" aria-label="Odstrániť produkt z košíka">
                                    Odstrániť z košíka
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <aside class="sidebar">
                <div class="sidebar-box">
                    <h1>Zhrnutie objednávky</h1>
                    <hr class="summary-divider">
                    <div v-for="_ in 3" class="summary-lineitem">
                        <p>Produkt</p>
                        <p class="summary-price">33.33 EUR</p>
                    </div>
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Medzisúčet</p>
                        <p class="summary-price">99.99 EUR</p>
                    </div>
                    <div class="summary-lineitem">
                        <p>Zľavy</p>
                        <p class="summary-price">00.00 EUR</p>
                    </div>
                    <hr class="summary-divider">
                    <div class="summary-lineitem">
                        <p>Celkovo</p>
                        <p class="summary-price">99.99 EUR</p>
                    </div>
                    <button class="checkout-btn" aria-label="Pokračovať k pokladni">Pokladňa</button>
                </div>
                <div class="sidebar-box">
                    <h1>Kupóny</h1>
                    <input v-model="coupon" class="coupon-input" type="text" placeholder="Zadaj kód kupónu...">
                    <button @click="applyCoupon" class="coupon-btn" aria-label="Aplikuj kupón">Aplikuj</button>
                </div>
            </aside>
        </section>
    </div>
</template>

<script setup>
    const coupon = ref(null);

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

    .product-option {
        display: flex;
        gap: .5rem;
    }

    .product-option-title {
        color: rgba(255, 255, 255, .5);
    }

    .product-option-value {
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
</style>