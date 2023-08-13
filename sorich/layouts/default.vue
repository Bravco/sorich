<template>
    <div>
        <header>
            <nav :class="{ 'scrolled': scrolled }">
                <div class="nav-left">
                    <Logo class="logo"/>
                    <ul :class="['nav-list', { 'active': isMobileMenuActive }]">
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/">Domov</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/products">
                                Obchod
                                <Icon class="nav-dropdown-indicator" name="mdi:chevron-down" size="1.5rem"/>
                            </NuxtLink>
                            <ul class="nav-dropdown">
                                <li v-for="category in product_categories" :key="category.id">
                                    <NuxtLink class="nav-link" :to="`/products?category_id=${category.id}`">{{ category.name }}</NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="nav-right">
                    <NuxtLink to="">
                        <Icon name="mdi:account-outline" size="1.5rem"/>
                    </NuxtLink>
                    <NuxtLink class="cart-link" to="/cart">
                        <Icon name="mdi:cart-outline" size="1.5rem"/>
                        <span v-if="cart().value">
                            {{ formatPrice(cart().value.total) }}
                            {{ cart().value.region.currency_code.toUpperCase() }}
                        </span>
                    </NuxtLink>
                    <button class="mobile-nav-btn" @click.prevent="toggleMobileNav" aria-label="Prepnúť mobilnú navigáciu">
                        <Icon name="heroicons:bars-2" size="2rem"/>
                    </button>
                </div>
            </nav>
        </header>

        <main>
            <slot/>
        </main>
        
        <footer>
            <div class="footer-top">
                <div class="footer-item">
                    <div>
                        <Logo/>
                        <p class="footer-description">Eshop s originálnym oblečením<br>priamo zo srdca Slovenska.</p>
                    </div>
                    <div class="footer-socials">
                        <a href="https://www.instagram.com/so_rich_eu/" target="_blank">
                            <Icon name="mdi:instagram" size="1.5rem"/>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100078887210558&paipv=0&eav=AfZ0QNqJczVYLiUzq2w7oxDu-E0o_v-glOWH9wgmVEXUwrENrinIsuuWuQIj5gV0ZCY" target="_blank">
                            <Icon name="mdi:facebook" size="1.5rem"/>
                        </a>
                    </div>
                </div>
                <div class="footer-item">
                    <span class="footer-item-header">Firma</span>
                    <ul>
                        <li class="footer-item-link">
                            Vyšný Hámor 13
                            052 01 Spišská Nová Ves
                        </li>
                        <li class="footer-item-link">IČO: 54005531</li>
                        <li class="footer-item-link">DIČ: 2121544667</li>
                    </ul>
                </div>
                <div class="footer-item">
                    <span class="footer-item-header">Dokumenty</span>
                    <ul>
                        <li class="footer-item-link">
                            <NuxtLink to="">Veľkostné tabuľky</NuxtLink>
                        </li>
                        <li class="footer-item-link">
                            <NuxtLink to="">Obchodné podmienky</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="footer-item">
                    <span class="footer-item-header">Kontakt</span>
                    <ul>
                        <li class="footer-item-link">
                            <a href="tel:+421948634743">+421 948 634 743 </a>
                        </li>
                        <li class="footer-item-link">
                            <a href="mailto:sorich456@gmail.com">sorich456@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>
            <span class="footer-divider"/>
            <p class="footer-copyright">&copy; 2023 SoRich s.r.o. | Vyhradené všetky práva</p>
        </footer>
    </div>
</template>

<script setup>
    const { afterEach } = useRouter();
    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();
    const { cart } = useCart();

    const { product_categories } = await medusaClient.productCategories.list();

    const scrolled = ref(false);
    const isMobileMenuActive = ref(false);

    function toggleMobileNav() {
        isMobileMenuActive.value = !isMobileMenuActive.value;
    }

    afterEach(() => {
        isMobileMenuActive.value = false;
    });

    onMounted(() => {
        if (process.client) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 0) {
                    scrolled.value = true;
                } else {
                    scrolled.value = false;
                }
            });
        }
    });
</script>

<style scoped>
    main {
        min-height: 100svh;
    }

    nav, .nav-left, .nav-right, .nav-list, footer, .footer-socials {
        display: flex;
        align-items: center;
    }

    nav {
        width: 100%;
        justify-content: space-between;
        position: fixed;
        padding: 1rem var(--main-horizontal-padding);
        z-index: 100;
        transition-property: background-colorm backdrop-filter;
        transition-duration: 300ms;
    }

    nav.scrolled {
        background-color: rgba(0, 0, 0, .25);
        backdrop-filter: blur(1rem);
    }

    .nav-left {
        gap: 3rem;
    }

    .nav-list {
        gap: 2rem;
    }

    .nav-item {
        position: relative;
    }

    .nav-link {
        font-size: 1.125rem;
        font-weight: 500;
    }

    .nav-dropdown-indicator {
        position: absolute;
        transition: rotate 300ms;
    }

    .nav-item:has(.nav-dropdown-indicator):hover .nav-dropdown-indicator {
        rotate: -180deg;
    }

    .nav-dropdown {
        width: 8rem;
        min-width: fit-content;
        display: none;
        flex-direction: column;
        gap: .5rem;
        position: absolute;
        padding: 1rem;
        z-index: 1;
        overflow: hidden;
        background-color: white;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, .1);
    }

    .nav-item:has(.nav-dropdown):hover .nav-dropdown {
        display: flex;
    }

    .nav-dropdown .nav-link {
        color: black;
    }

    .nav-right {
        gap: 1rem;
    }

    .cart-link {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    .mobile-nav-btn {
        display: none;
    }

    footer {
        flex-direction: column;
        padding: 0 var(--main-horizontal-padding);
        background-color: black;
    }

    .footer-top {
        width: 100%;
        display: grid;
        grid-template-columns: 2fr repeat(3, 1fr);
        gap: 2rem;
        padding: 4rem 0 6rem 0;
    }

    .footer-item {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .footer-item-header {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .footer-item-link {
        font-size: 1.125rem;
    }

    .footer-socials {
        gap: 1rem;
    }

    .footer-divider {
        width: 100%;
        height: 1px;
        background-color: white;
    }

    .footer-copyright {
        padding: 1rem;
    }

    @media only screen and (max-width: 768px) {
        nav:has(.nav-list.active) {
            background-color: unset;
            backdrop-filter: unset;
        }

        .logo, .nav-right {
            z-index: 1;
        }

        .nav-list {
            width: 100%;
            height: 100vh;
            opacity: 0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            transition-property: opacity, background-color, backdrop-filter;
            transition-duration: 300ms;
        }

        .nav-list.active {
            opacity: 1;
            background-color: rgba(0, 0, 0, .25);
            backdrop-filter: blur(1rem);
        }

        .nav-list:not(.active) {
            pointer-events: none;
        }

        .nav-item {
            text-align: center;
        }

        .nav-link {
            font-size: 3rem;
        }

        .nav-dropdown-indicator {
            display: none;
        }

        .nav-dropdown {
            width: unset;
            min-width: unset;
            position: unset;
            padding: unset;
            overflow: unset;
            color: unset;
            background-color: unset;
            box-shadow: unset;

            display: flex;
            gap: 2rem;
            padding-top: 2rem;
        }

        .nav-dropdown .nav-link {
            color: white;
        }

        .mobile-nav-btn {
            display: unset;
        }

        .cart-link span {
            display: none;
        }

        .footer-top {
            display: flex;
            flex-direction: column;
        }
    }
</style>