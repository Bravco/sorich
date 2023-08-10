<template>
    <div>
        <section class="order-process">
            <ul class="order-process-list">
                <li class="order-process-item">
                    <span class="order-process-item-index">1</span>
                    <nuxt-img class="order-process-item-img" src="/images/payment.webp" loading="lazy" alt="payment"/>
                    <h3 class="order-process-item-heading">Platba</h3>
                    <p class="order-process-item-paragraph">
                        Umožnujeme platbu kartou, dobierkou alebo priamo bankovým prevodom.
                    </p>
                </li>
                <li class="order-process-item">
                    <span class="order-process-item-index">2</span>
                    <nuxt-img class="order-process-item-img" src="/images/delivery.webp" loading="lazy" alt="delivery"/>
                    <h3 class="order-process-item-heading">Donáška</h3>
                    <p class="order-process-item-paragraph">
                        Dodanie nášho tovaru trvá menej ako týždeň a to počas pracovných dní.
                    </p>
                </li>
                <li class="order-process-item">
                    <span class="order-process-item-index">3</span>
                    <nuxt-img class="order-process-item-img" src="/images/box.webp" alt="acceptance"/>
                    <h3 class="order-process-item-heading">Reklamácia</h3>
                    <p class="order-process-item-paragraph">
                        Zákazníci u nás majú istotu s našim jednoduchým procesom reklamácie.
                    </p>
                </li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
    .order-process {
        padding: 8rem 10%;
    }

    .order-process-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8rem;
        position: relative;
    }

    .order-process-list::before {
        content: "";
        width: calc(100% - 13.75% * 2);
        height: 2px;
        position: absolute;
        left: 13.75%;
        top: 1rem;
        z-index: -1;
        background-color: var(--color-primary);
    }

    .order-process-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .order-process-item-index {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        margin-bottom: 2rem;
        font-weight: bold;
        border-radius: 50%;
        background-color: var(--color-primary);
    }

    .order-process-item-img {
        width: 6rem;
        height: 6rem;
    }

    .order-process-item-heading {
        margin: 2rem 0 1rem 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--color-primary);
    }

    .order-process-item-paragraph {
        text-align: center;
        font-size: 1.25rem;
    }

    @media only screen and (max-width: 768px) {
        .order-process-list {
            grid-template-columns: 1fr;
        }

        .order-process-list::before {
            content: none;
        }

        .order-process-item-index {
            margin: none;
        }
    }
</style>