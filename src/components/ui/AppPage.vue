<script setup lang="ts">
import { defineProps, onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    back: {
        type: Boolean,
        default: false,
    },
});
onMounted(() => {
    document.title = `${props.title} | Task Manager`;
});
</script>

<template>
    <div class="breadcrumbs" v-if="back">
        <router-link class="text-white" to="/">На головну</router-link>
    </div>
    <div class="card">
        <h1 class="card-title">
            {{ title }}
            <slot name="title" />
        </h1>
        <slot />
    </div>
</template>

<style scoped></style>
