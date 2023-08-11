<template>
    <div>
        <section class="wrapper">
            <div class="cart">
                <h1>Nákupný košík</h1>
                <ul class="product-list">
                    <li class="product-item">
                        <nuxt-img src="/images/product.webp" alt="product-image"/>
                        <div class="product-description">
                            <h2 class="product-title">Product title</h2>
                            <ul class="product-options">
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
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>