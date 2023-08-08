<template>
    <div>
        <HomeHero/>
        <HomeNew :products="dummyProducts"/>
        <Discounts/>
        <HomeOrderProcess/>
    </div>
</template>

<script setup>
    const dummyProducts = [
        {
            id: 0,
            title: "SoRich Produkt 1",
            price: "1999",
            url: "/images/product.webp",
        },
        {
            id: 1,
            title: "SoRich Produkt 2",
            price: "1999",
            url: "/images/product.webp",
        },
        {
            id: 2,
            title: "SoRich Produkt 3",
            price: "1999",
            url: "/images/product.webp",
        },
    ];
</script>