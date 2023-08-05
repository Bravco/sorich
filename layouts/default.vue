<template>
    <div>
        <header>
            <nav>
                <div class="nav-left">
                    <Logo/>
                    <ul class="nav-list">
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/">Domov</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/">
                                Obchod
                                <Icon class="nav-dropdown-indicator" name="mdi:chevron-down" size="1.5rem"/>
                            </NuxtLink>
                            <ul class="nav-dropdown">
                                <li class="nav-dropdown-item">
                                    <NuxtLink class="nav-link" to="/">Tričká</NuxtLink>
                                </li>
                                <li class="nav-dropdown-item">
                                    <NuxtLink class="nav-link" to="/">Mikiny</NuxtLink>
                                </li>
                                <li class="nav-dropdown-item">
                                    <NuxtLink class="nav-link" to="/">Nohavice</NuxtLink>
                                </li>
                                <li class="nav-dropdown-item">
                                    <NuxtLink class="nav-link" to="/">Doplnky</NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="nav-right">
                    <button>
                        <Icon name="material-symbols:shopping-cart-outline-rounded" size="1.5rem"/>
                    </button>
                    <button>
                        <Icon name="material-symbols:person-outline-rounded" size="1.5rem"/>
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
        padding: 1rem 10%;
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

    .nav-right {
        gap: 1rem;
    }

    footer {
        flex-direction: column;
        padding: 0 10%;
        color: white;
        background-color: black;
    }

    .footer-top {
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
</style>