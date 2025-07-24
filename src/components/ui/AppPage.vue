<script setup lang="ts">
import { defineProps, onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
onMounted(() => {
    document.title = `${props.title} | Task Manager`;
});
</script>

<template>
    <div class="card">
        <h1 class="card-title">
            {{ title }}
            <slot name="title" />
        </h1>
        <slot />
    </div>
</template>

<style scoped></style>
