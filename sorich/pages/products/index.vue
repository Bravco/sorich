<template>
    <div>
        <Discounts/>
        <section class="main-wrapper">
            <aside class="categories-wrapper">
                <h3 class="category-heading">Kategórie</h3>
                <div class="category-list">
                    <button
                    :class="['category-btn', { active: selectedCategoryId === null }]"
                        @click.prevent="selectCategory()" 
                        aria-label="Vybrať všetko"
                    >Všetky</button>
                    <button
                        v-for="category in product_categories" :key="category.id"
                        @click.prevent="selectCategory(category.id)"
                        :class="['category-btn', { active: selectedCategoryId === category.id }]"
                        :aria-label="`Vybrať ${category.name}`"
                    >{{ category.name }}</button>
                </div>
            </aside>
            <div class="products-wrapper">
                <div class="products-header">
                    <div class="search-box">
                        <Icon name="mdi:magnify" size="1.5rem"/>
                        <input v-model="searchQuery" type="text" placeholder="Vyhľadaj pordukt...">
                    </div>
                    <v-select
                        v-model="orderBy"
                        class="sortby"
                        label="Zoradiť podľa"
                        :items="['ceny (zostupne)', 'ceny (vzostupne)']"
                        variant="outlined"
                        item-color="var(--color-primary)"
                        density="compact"
                        :clearable="true"
                    ></v-select>
                </div>
                <ul class="product-list">
                    <li v-for="product in queryProducts" :key="product.id">
                        <NuxtLink :to="`/products/${product.id}`">
                            <nuxt-img class="product-img" :src="product.thumbnail" loading="lazy" alt="product-image"/>
                            <div class="product-description">
                                <h4 class="product-title">{{ product.title }}</h4>
                                <p class="product-price">
                                    {{ product.variants[0] ? formatPrice(product.variants[0].prices[0].amount) : "" }}
                                    {{ product.variants[0] ? product.variants[0].prices[0].currency_code.toUpperCase() : "" }}
                                </p>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
    useHead({
        title: "SoRich | Obchod",
    });

    const { category_id: queryCategoryId } = useRoute().query;
    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();
    
    const { product_categories } = await medusaClient.productCategories.list();

    const products = ref<any>(null);
    const selectedCategoryId = ref<string | null>(null);
    const searchQuery = ref<string | null>(null);
    const orderBy = ref<string | null>(null);

    assignProducts(queryCategoryId);

    const sortedProducts = computed(() => {
        if (products.value === null) {
            return null;
        }

        switch (orderBy.value) {
            case "ceny (zostupne)":
                return [...products.value].sort((a, b) => a.variants[0].prices[0].amount - b.variants[0].prices[0].amount);
        
            case "ceny (vzostupne)":
                return [...products.value].sort((a, b) => a.variants[0].prices[0].amount - b.variants[0].prices[0].amount).reverse();
            
            default:
                return products.value;
        }
    });

    const queryProducts = computed(() => {
        if (sortedProducts.value === null) {
            return null;
        }

        return sortedProducts.value.filter((product : any) => 
            product.title.toLowerCase()
                .includes(typeof searchQuery.value === "string" ? searchQuery.value.toLowerCase() : "")
        );
    });

    async function selectCategory(id = null) {
        if (selectedCategoryId.value !== id) {
            assignProducts(id);
        }
    }

    async function assignProducts(categoryId : any) {
        selectedCategoryId.value = categoryId === undefined
            ? null
            : categoryId;

        const { products: categoryProducts } = (categoryId === null || categoryId === undefined)
            ? await medusaClient.products.list()
            : await medusaClient.products.list({ category_id: [categoryId] });
        
        if (JSON.stringify(products.value) !== JSON.stringify(categoryProducts))  {
            products.value = categoryProducts;
        }
    }
</script>

<style scoped>
    .main-wrapper {
        display: grid;
        -webkit-box-align: start;
        align-items: start;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        padding: 4rem var(--main-horizontal-padding);
    }

    .categories-wrapper, .products-wrapper {
        display: grid;
        grid-template-rows: 4rem auto;
        gap: 1rem;
    }

    .categories-wrapper {
        position: sticky;
        top: 6rem;
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

    .category-btn {
        text-align: start;
        font-size: 1.125rem;
    }

    .category-btn.active {
        color: var(--color-primary);
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
        border: 1px solid var(--color-text);
        border-radius: .5rem;
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
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
    
    .product-img {
        width: 100%;
        aspect-ratio: 1/1;
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

    @media only screen and (max-width: 1480px) {
        .product-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media only screen and (max-width: 1024px) {
        .product-list {
            grid-template-columns: 1fr;
        }
    }

    @media only screen and (max-width: 768px) {
        .main-wrapper {
            grid-template-columns: 1fr;
            gap: 0;
        }

        .categories-wrapper, .products-wrapper {
            grid-template-rows: unset;
        }

        .categories-wrapper {
            position: static;
        }

        .category-list {
            flex-wrap: wrap;
            flex-direction: row;
            gap: 1rem;
        }
    }
</style>