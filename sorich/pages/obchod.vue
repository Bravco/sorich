<template>
    <div>
        <Discounts/>
        <section class="main-wrapper">
            <div class="categories-wrapper">
                <h3 class="category-heading">Kategórie</h3>
                <ul class="category-list">
                    <li class="category-item">
                        <NuxtLink to="/obchod">Všetky</NuxtLink>
                    </li>
                    <li class="category-item">
                        <NuxtLink to="/obchod">Tričká</NuxtLink>
                    </li>
                    <li class="category-item">
                        <NuxtLink to="/obchod">Tričká</NuxtLink>
                    </li>
                    <li class="category-item">
                        <NuxtLink to="/obchod">Nohavice</NuxtLink>
                    </li>
                    <li class="category-item">
                        <NuxtLink to="/obchod">Doplnky</NuxtLink>
                    </li>
                    <li class="category-item">
                        <NuxtLink to="/obchod">Nezaradené</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="products-wrapper">
                <div class="products-header">
                    <div class="search-box">
                        <Icon name="mdi:magnify" size="1.5rem"/>
                        <input v-model="searchQuery" type="text" placeholder="Vyhľadaj pordukt...">
                    </div>
                    <v-select
                        class="sortby"
                        label="Zoradiť podľa"
                        :items="['ceny (zostupne)', 'ceny (vzostupne)']"
                        variant="outlined"
                        item-color="var(--color-primary)"
                        density="compact"
                    ></v-select>
                </div>
                <ul class="product-list">
                    <li v-for="_ in 10">
                        <NuxtLink to="/obchod">
                            <nuxt-img class="product-img" src="/images/product.webp" alt="product-image"/>
                            <div class="product-description">
                                <h4 class="product-title">Product title</h4>
                                <span class="product-price">€ 99.99</span>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup>
    const searchQuery = ref("");
</script>

<style scoped>
    .main-wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        padding: 4rem 10%;
    }

    .categories-wrapper, .products-wrapper {
        display: grid;
        grid-template-rows: 4rem auto;
        gap: 1rem;
        
    }

    .category-heading {
        align-self: center;
        font-size: 1.5rem;
    }

    .category-list {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .category-item {
        font-size: 1.125rem;
    }

    .products-header {
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: space-between;
    }

    .search-box {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .5rem;
        padding: .5rem 1rem;
        border: 2px solid var(--color-text);
        border-radius: 2rem;
    }

    .search-box input {
        font-size: 1.125rem;
    }

    .sortby {
        max-width: 16rem;
        margin-top: 1.5rem;
    }

    .product-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
        gap: 1.5rem;
    }

    .product-img {
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    .product-description {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    .product-title {
        font-family: var(--default-condensed-font-family);
        font-size: 1.5rem;
        font-weight: normal;
    }

    .product-price {
        font-family: var(--default-condensed-font-family);
        font-size: 2rem;
        font-weight: bold;
        color: var(--color-primary);
    }

    @media only screen and (max-width: 768px) {
        .main-wrapper {
            grid-template-columns: 1fr;
            gap: 0;
        }

        .categories-wrapper, .products-wrapper {
            grid-template-rows: unset;
        }

        .category-list {
            flex-wrap: wrap;
            flex-direction: row;
            gap: 1rem;
        }
    }
</style>