<template>
    <div>

    </div>
</template>

<script setup>
    const { id: productId } = useRoute().params;
    const medusaClient = useMedusaClient();

    const { product } = await medusaClient.products.retrieve(productId);
</script>