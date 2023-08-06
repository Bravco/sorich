<template>
    <div>
        <section class="hero">
            <div class="hero-imgs">
                <nuxt-img v-for="i in 6" :key="i" class="hero-img" :src="`/images/hero${i}.webp`" :alt="`hero${i}`"/>
            </div>
            <h1 class="hero-heading">Muži<br>Ženy</h1>
        </section>
    </div>
</template>

<style scoped>
    .hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: calc(5rem + 2rem) var(--main-horizontal-padding) 4rem var(--main-horizontal-padding);
        background-image: url("/images/hero.webp");
        background-size: cover;
        background-position: top;
    }

    .hero::after {
        --step: 2%;
        --thickness: 1px;
        --color: white;
        --offset: 5%;
        --_g: #0000 90deg,var(--color) 0;
        --_p: var(--offset) var(--offset) border-box no-repeat;

        content: "";
        width: calc(100% - var(--step)*2);
        height: calc(100% - 5rem);
        position: absolute;
        top: 2.5rem;
        left: var(--step);
        z-index: 1;
        pointer-events: none;
        border: var(--thickness) solid var(--color);
        border-top: var(--thickness) solid #0000;
        background:
            conic-gradient(from 90deg  at top var(--thickness) left  var(--thickness), var(--_g)) 0    0 / var(--_p),
            conic-gradient(from 180deg at top var(--thickness) right var(--thickness), var(--_g)) 100% 0 / var(--_p);
    }

    .hero-imgs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .hero-img {
        width: 12rem;
        height: 12rem;
        object-fit: cover;
        object-position: center;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.50), 0px 4px 20px 0px rgba(0, 0, 0, 0.25) inset;
    }

    .hero-heading {
        font-size: 8rem;
        font-family: var(--black-font-family);
        text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.50);
    }

    @media only screen and (max-width: 768px) {
        .hero {
            justify-content: center;
        }
        
        .hero-imgs {
            display: none;
        }
    }

    @media only screen and (max-width: 1024px) {
        .hero-img {
            width: 8rem;
            height: 8rem;
        }

        .hero-heading {
            font-size: 6rem;
        }
    }
</style>