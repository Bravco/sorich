<template>
    <div>
        <div class="main">
            <button @click.prevent="decrement" class="subtract-btn" aria-label="Zmenšiť počet">
                <Icon name="mdi:minus"/>
            </button>
            <span class="value">{{ value }}</span>
            <button @click.prevent="increment" class="add-btn" aria-label="Zväčšiť počet">
                <Icon name="mdi:plus"/>
            </button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: 10,
        },
        modelValue: {
            type: Number,
            default: 10,
        },
    });

    const emit = defineEmits(["update:modelValue"]);

    const value = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit("update:modelValue", value);
        }
    });

    function increment() {
        if (value.value < props.max) {
            value.value++;
        }
    }

    function decrement() {
        if (value.value > props.min) {
            value.value--;
        }
    }
</script>

<style scoped>
    input[type=number] { 
    -moz-appearance: textfield;
        appearance: textfield;
        margin: 0; 
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    .main {
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .5rem;
        background-color: rgba(0, 0, 0, .25);
    }

    .subtract-btn, .add-btn {
        width: 2.5rem;
        height: 2.5rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
    }

    .value {
        width: 2rem;
        text-align: center;
        font-size: 1.125rem;
        font-weight: 500;
    }
</style>