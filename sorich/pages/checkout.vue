<template>
    <div>
        <section v-if="cart().value" class="wrapper">
            <h1 class="heading">Pokladňa</h1>
            <div class="process">
                <ul class="process-list">
                    <li class="process-item">
                        <h2 class="process-heading">Kontakt</h2>
                        <span v-if="Stage.CONTACT < stage" class="completed-icon-container">
                            <Icon name="mdi:check" size="1.5rem"/>
                        </span>
                        <form v-if="stage === Stage.CONTACT" @submit.prevent="stage = Stage.ADDRESS" class="process-content">
                            <div class="inputfield">
                                <label for="email">Email</label>
                                <input v-model="data.email" type="email" name="email" id="email" placeholder="example@example.com" required>
                            </div>
                            <div class="inputfield">
                                <label for="phone">Telefón</label>
                                <input v-model="data.phone" type="tel" name="phone" id="phone" placeholder="+421 123 123 123">
                            </div>
                            <div class="process-footer">
                                <button class="next-btn" type="submit" aria-label="Ďalej">Ďalej</button>
                            </div>
                        </form>
                    </li>
                    <li class="process-item">
                        <h2 class="process-heading">Adresa</h2>
                        <span v-if="Stage.ADDRESS < stage" class="completed-icon-container">
                            <Icon name="mdi:check" size="1.5rem"/>
                        </span>
                        <form
                            v-if="stage === Stage.ADDRESS" 
                            @submit.prevent="() => {
                                stage = Stage.DELIVERY;
                                setShippingAddress(cart().value.id);
                            }" 
                            class="process-content"
                        >
                            <div class="inputfield-row">
                                <div class="inputfield">
                                    <label for="first-name">Krstné meno</label>
                                    <input v-model="data.first_name" type="text" name="first-name" id="first-name" placeholder="Stefan" required>
                                </div>
                                <div class="inputfield">
                                    <label for="last-name">Priezvisko</label>
                                    <input v-model="data.last_name" type="text" name="last-name" id="last-name" placeholder="Baca" required>
                                </div>
                            </div>
                            <div class="inputfield-row">
                                <div class="inputfield">
                                    <label for="country-code">Krajina</label>
                                    <select v-model="data.country_code" name="country-code" id="country-code" required>
                                        <option value="sk">Slovensko</option>
                                        <option value="cz">Česká Republika</option>
                                    </select>
                                </div>
                                <div class="inputfield">
                                    <label for="city">Obec</label>
                                    <input v-model="data.city" type="text" name="city" id="city" placeholder="Kosice" required>
                                </div>
                            </div>
                            <div class="inputfield-row">
                                <div class="inputfield">
                                    <label for="province">Oblasť</label>
                                    <input v-model="data.province" type="text" name="province" id="province" placeholder="Kosicky kraj">
                                </div>
                                <div class="inputfield">
                                    <label for="postal-code">PSČ</label>
                                    <input v-model="data.postal_code" type="text" name="postal-code" id="postal-code" placeholder="040 01" required>
                                </div>
                            </div>
                            <div class="inputfield-row">
                                <div class="inputfield">
                                    <label for="address1">Adresa 1</label>
                                    <input v-model="data.address_1" type="text" name="address1" id="address1" placeholder="Farmarska 13" required>
                                </div>
                                <div class="inputfield">
                                    <label for="address2">Adresa 2</label>
                                    <input v-model="data.address_2" type="text" name="address2" id="address2" placeholder="Stefanikova 5">
                                </div>
                            </div>
                            <div class="process-footer">
                                <button @click="stage = Stage.CONTACT" class="back-btn" aria-label="Späť">
                                    <Icon name="uil:angle-left-b"/>
                                    Späť
                                </button>
                                <button class="next-btn" type="submit" aria-label="Ďalej">Ďalej</button>
                            </div>
                        </form>
                    </li>
                    <li class="process-item">
                        <h2 class="process-heading">Donáška</h2>
                        <span v-if="Stage.DELIVERY < stage" class="completed-icon-container">
                            <Icon name="mdi:check" size="1.5rem"/>
                        </span>
                        <form 
                            v-if="stage === Stage.DELIVERY" 
                            @submit.prevent="() => {
                                if (selectedShippingOptionId) {
                                    stage = Stage.PAYMENT;
                                    addShipingMethod(cart().value.id);
                                }
                            }" 
                            class="process-content"
                        >
                            <ul v-if="shippingOptions" class="shipping-option-list">
                                <li 
                                    v-for="shippingOption in shippingOptions" 
                                    :key="shippingOption.id"
                                    @click="selectedShippingOptionId = shippingOption.id"
                                    :class="['shipping-option-item', { active: selectedShippingOptionId === shippingOption.id }]"
                                >
                                    <h3>{{ shippingOption.name }}</h3>
                                    <p>
                                        {{ formatPrice(shippingOption.amount) }}
                                        {{ cart().value.region.currency_code.toUpperCase() }}
                                    </p>
                                </li>
                            </ul>
                            <div class="process-footer">
                                <button @click="stage = Stage.ADDRESS" class="back-btn" aria-label="Späť">
                                    <Icon name="uil:angle-left-b"/>
                                    Späť
                                </button>
                                <button class="next-btn" type="submit" aria-label="Ďalej">Ďalej</button>
                            </div>
                        </form>
                    </li>
                    <li class="process-item">
                        <h2 class="process-heading">Platba</h2>
                        <form v-if="stage === Stage.PAYMENT" @submit.prevent="" class="process-content">
                            <div class="process-footer">
                                <button @click="stage = Stage.DELIVERY" class="back-btn" aria-label="Späť">
                                    <Icon name="uil:angle-left-b"/>
                                    Späť
                                </button>
                                <button class="pay-btn" type="submit" aria-label="Zaplatiť">Zaplatiť</button>
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
            <aside class="sidebar">
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
                        - {{ formatPrice(Math.abs(cart().value.total - cart().value.subtotal)) }}
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
            </aside>
        </section>
    </div>
</template>

<script lang="ts" setup>
    enum Stage {
        CONTACT,
        ADDRESS,
        DELIVERY,
        PAYMENT,
    }

    useHead({
        title: "SoRich | Pokladňa",
    });

    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();
    const { cart, setCart } = useCart();

    const shippingOptions = ref<any>(null);
    const stage = ref<Stage>(Stage.CONTACT);
    const data = ref<any>({});
    const selectedShippingOptionId = ref<string | null>(null);

    onMounted(async () => {
        const cartId = localStorage.getItem("cart_id");
        
        if (cartId) {
            const { shipping_options } = await medusaClient.shippingOptions.listCartOptions(cartId);
            shippingOptions.value = shipping_options;
        }
    });
    
    function setShippingAddress(cartId : string) {
        medusaClient.carts.update(cartId, {
            email: data.value.email,            
            shipping_address: {
                first_name: data.value.first_name,
                last_name: data.value.last_name,
                phone: data.value.phone,
                address_1: data.value.address_1,
                address_2: data.value.address_2,
                city: data.value.city,
                country_code: data.value.country_code,
                province: data.value.province,
                postal_code: data.value.postal_code,
            },
        }).then(({ cart: updatedCart }) => setCart(updatedCart));
    }

    function addShipingMethod(cartId : string) {
        if (selectedShippingOptionId !== null) {
            medusaClient.carts.addShippingMethod(cartId, {
                option_id: selectedShippingOptionId.value as string,
            }).then(({ cart: updatedCart }) => setCart(updatedCart));
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
        padding: 6rem 10%;
    }

    .heading {
        grid-column: 1 / span 2;
    }

    .process-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .process-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 2rem;
        border: 1px solid rgba(255, 255, 255, .25);
        border-radius: .5rem;
        background-color: rgba(0, 0, 0, .25);
    }

    .process-item:has(.completed-icon-container) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .process-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .inputfield-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .inputfield {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: .5rem;
    }

    .inputfield input, .inputfield select {
        width: 100%;
        padding: .25rem .5rem;
        color: white;
        border: 1px solid white;
        border-radius: .25rem;
        opacity: .5;
        transition: opacity 300ms;
    }

    .inputfield select option {
        color: black;
    }

    .inputfield input:focus, .inputfield select:focus {
        opacity: 1;
    }

    .inputfield:not(:has(input[required]),:has(select[required])) label::after {
        content: "(Voliteľné)";
        margin-left: .5rem;
        font-size: .75rem;
        opacity: .5;
    }

    .process-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 2rem;
    }

    .process-footer:has(.back-btn) {
        justify-content: space-between;
    }

    .next-btn, .pay-btn {
        padding: .25rem 1rem;
        font-size: 1.125rem;
        font-weight: 500;
        border-radius: .25rem;
        background-color: var(--color-primary);
    }

    .pay-btn {
        background-color: var(--color-success);
    }

    .completed-icon-container {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background-color: var(--color-success);
    }

    .shipping-option-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .shipping-option-item {
        padding: 1rem;
        border: 1px solid white;
        border-radius: .5rem;
        cursor: pointer;
        opacity: .5;
        transition-property: opacity, border-color, box-shadow;
        transition-duration: 300ms;
    }

    .shipping-option-item.active {
        border-color: var(--color-success);
        box-shadow: 0px 0px 8px 0px var(--color-success);
        opacity: 1;
    }

    .sidebar {
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: sticky;
        top: 6rem;
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
</style>