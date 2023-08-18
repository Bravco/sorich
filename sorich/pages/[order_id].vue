<template>
    <div>
        <section v-if="order">
            <pre wrap>{{ order }}</pre>
        </section>
    </div>
</template>

<script setup lang="ts">
    useHead({
        title: "SoRich | Objednávka",
    });

    const { order_id } = useRoute().params;
    const medusaClient = useMedusaClient();
    const { formatPrice } = useUtils();

    const order = ref<any>(null);

    medusaClient.orders.retrieve(order_id as string)
        .then(({ order: fetchedOrder }) => order.value = fetchedOrder)
        .catch(() => {
            navigateTo("/");
        });
</script>