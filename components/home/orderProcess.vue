<template>
    <div>
        <section class="order-process">
            <ul class="order-process-list">
                <li class="order-process-item">
                    <span class="order-process-item-index">1</span>
                    <nuxt-img class="order-process-item-img" src="/images/payment.webp" alt="payment"/>
                    <p class="order-process-item-paragraph">
                        Nejaké informácia ohľadom <span>objednávky</span>, neviem čo tu mám napísať.
                    </p>
                </li>
                <li class="order-process-item">
                    <span class="order-process-item-index">2</span>
                    <nuxt-img class="order-process-item-img" src="/images/delivery.webp" alt="delivery"/>
                    <p class="order-process-item-paragraph">
                        Nejaké informácia ohľadom <span>donášky</span>, neviem čo tu mám napísať.
                    </p>
                </li>
                <li class="order-process-item">
                    <span class="order-process-item-index">3</span>
                    <nuxt-img class="order-process-item-img" src="/images/box.webp" alt="acceptance"/>
                    <p class="order-process-item-paragraph">
                        Nejaké informácia ohľadom <span>prevzatia</span>, neviem čo tu mám napísať.
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
        display: flex;
        justify-content: center;
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
        gap: 2rem;
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

    .order-process-item-paragraph {
        font-size: 1.25rem;
    }

    .order-process-item-paragraph span {
        font-weight: 500;
        color: var(--color-primary);
    }

    @media only screen and (max-width: 768px) {
        .order-process-list {
            flex-direction: column;
            align-items: center;
        }

        .order-process-list::before {
            content: none;
        }

        .order-process-item-index {
            margin: none;
        }
    }
</style>