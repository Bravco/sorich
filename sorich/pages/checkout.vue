<template>
    <div>
        <section v-if="cart().value" class="wrapper">
            <h1 class="heading">Pokladňa</h1>
            <div class="process">
                <ul class="process-list">
                    <li class="process-item">
                        <h2 class="process-heading">Kontakt</h2>
                        <form @submit.prevent="" class="process-content">
                            <div class="inputfield">
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email" required>
                            </div>
                            <div class="inputfield">
                                <label for="phone">Telefón</label>
                                <input type="tel" name="phone" id="phone">
                            </div>
                            <div class="process-footer">
                                <button class="next-btn" type="submit" aria-label="Ďalej">Ďalej</button>
                            </div>
                        </form>
                        
                    </li>
                    <li class="process-item">
                        <h2 class="process-heading">Adresa</h2>
                        <form @submit.prevent="" class="process-content">
                            <div class="inputfield-row">
                                <div class="inputfield">
                                    <label for="first-name">Krstné meno</label>
                                    <input type="text" name="first-name" id="first-name" required>
                                </div>
                                <div class="inputfield">
                                    <label for="last-name">Priezvisko</label>
                                    <input type="text" name="last-name" id="last-name" required>
                                </div>
                            </div>
                            <div class="inputfield-row">
                                <div class="inputfield">
                                    <label for="country">Krajina</label>
                                    <input type="text" name="country" id="country" required>
                                </div>
                                <div class="inputfield">
                                    <label for="city">Obec</label>
                                    <input type="text" name="city" id="city" required>
                                </div>
                            </div>
                            <div class="inputfield-row">
                                <div class="inputfield">
                                    <label for="province">Provincia</label>
                                    <input type="text" name="province" id="province">
                                </div>
                                <div class="inputfield">
                                    <label for="postal-code">PSČ</label>
                                    <input type="text" name="postal-code" id="postal-code" required>
                                </div>
                            </div>
                            <div class="inputfield">
                                <label for="address1">Adresa</label>
                                <input type="text" name="address1" id="address1" required>
                            </div>
                            <div class="inputfield">
                                <label for="address2">Byt, Apartmán a pod.</label>
                                <input type="text" name="address2" id="address2">
                            </div>
                            <div class="process-footer">
                                <button class="back-btn" aria-label="Späť">
                                    <Icon name="uil:angle-left-b"/>
                                    Späť
                                </button>
                                <button class="next-btn" type="submit" aria-label="Ďalej">Ďalej</button>
                            </div>
                        </form>
                    </li>
                    <li class="process-item">
                        <h2 class="process-heading">Donáška</h2>
                        <form submit.prevent="" class="process-content">
                            <div class="process-footer">
                                <button class="back-btn" aria-label="Späť">
                                    <Icon name="uil:angle-left-b"/>
                                    Späť
                                </button>
                                <button class="next-btn" type="submit" aria-label="Ďalej">Ďalej</button>
                            </div>
                        </form>
                    </li>
                    <li class="process-item">
                        <h2 class="process-heading">Platba</h2>
                        <form submit.prevent="" class="process-content">
                            <div class="process-footer">
                                <button class="back-btn" aria-label="Späť">
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
    useHead({
        title: "SoRich | Pokladňa",
    });

    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();
    const { cart, setCart } = useCart();
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

    .process-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .inputfield-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .inputfield {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: .5rem;
    }

    .inputfield input {
        width: 100%;
        padding: .25rem .5rem;
        border: 1px solid white;
        border-radius: .25rem;
        opacity: .5;
        transition: opacity 300ms;
    }

    .inputfield input:focus {
        opacity: 1;
    }

    .inputfield:has(input[required]) label::after {
        content: " *";
        color: red;
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