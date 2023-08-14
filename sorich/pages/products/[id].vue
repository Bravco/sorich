<template>
    <div>
        <section v-if="product" class="main-wrapper">
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
                        height="100%"
                    ></v-carousel-item>
                </v-carousel>
            </div>
            <div class="content-wrapper">
                <div class="product-heading">
                    <h1 class="product-title">{{ product.title }}</h1>
                    <p class="product-description">{{ product.description }}</p>
                </div>
                <v-radio-group 
                    v-for="option in options" 
                    :key="option.title" 
                    v-model="selectedOptions[option.title]"
                    :label="option.title" 
                    inline
                    class="option-radio-group"
                >
                    <v-radio v-for="value in option.values" :key="value" :label="value" :value="value"/>
                </v-radio-group>
                <p class="product-price">
                    {{ product.variants[0] ? formatPrice(product.variants[0].prices[0].amount) : "" }}
                    {{ product.variants[0] ? product.variants[0].prices[0].currency_code.toUpperCase() : "" }}
                </p>
                <div class="product-actions">
                    <Quantity v-model="quantity"/>
                    <button 
                        @click.prevent="addToCart()"
                        class="add-to-cart-btn" 
                        :disabled="Object.keys(selectedOptions).length < options.length" 
                        :aria-label="`Pridať ${product.title} do košíka`"
                    >Pridať do košíka</button>
                    <Icon v-if="loading" name="svg-spinners:90-ring-with-bg" size="1.5rem"/>
                    <p v-if="success" class="success">
                        Pridané do košíka
                        <Icon name="mdi:check"/>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
    const { id: productId } = useRoute().params;
    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();
    const { cart, setCart } = useCart();

    const product = ref<any>(null);
    const carouselIndex = ref<number>(0);
    const selectedOptions = ref<any>({});
    const quantity = ref<number>(1);
    const loading = ref<boolean>(false);
    const success = ref<boolean>(false);

    medusaClient.products.retrieve(productId as string).then(({ product: fetchedProduct }) => {
        product.value = fetchedProduct;

        useHead({
            title: `SoRich | ${fetchedProduct.title}`,
        });
    }).catch(() => {
        navigateTo("/products");
    });

    const options = computed(() => {
        if (product.value.options) {
            return product.value.options.map((option : any) => {
                const values = option.values
                    .map((valueObj : any) => valueObj.value)
                    .filter((value : any, index : any, self : any) => self.indexOf(value) === index);

                return {
                    title: option.title,
                    values: values,
                };
            });
        } else {
            return [];
        }
    });

    const selectedVariant = computed(() => {
        const searchOptions = Object.values(selectedOptions.value);

        for (const variant of product.value.variants) {
            if (variant.options) {
                const optionsMatch = variant.options.every((option : any) => {
                    return searchOptions.includes(option.value);
                });

                if (optionsMatch) {
                    return variant;
                }
            } else {
                break;
            }
        }

        return null;
    });

    function addToCart() {
        if (cart().value.id && selectedVariant.value && typeof selectedVariant.value.id === "string") {
            loading.value = true;
            medusaClient.carts.lineItems.create(cart().value.id, {
                variant_id: selectedVariant.value.id,
                quantity: quantity.value,
            }).then(({ cart: updatedCart }) => {
                setCart(updatedCart);
                loading.value = false;
                success.value = true;
            });
        }
    }
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

    .option-radio-group {
        flex: none;
    }

    .product-price {
        font-family: var(--default-condensed-font-family);
        font-size: 3rem;
        font-weight: bold;
        color: var(--color-primary);
    }

    .product-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
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

    .add-to-cart-btn:disabled,
    .add-to-cart-btn[disabled] {
        pointer-events: none;
        filter: opacity(.5);
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