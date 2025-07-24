<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    title: {
        type: String,
    },
});
const emit = defineEmits(['close']);
</script>

<template>
    <div class="modal-backdrop" @click="$emit('close')" />
    <div class="modal">
        <h3 v-if="title">{{ title }}</h3>
        <slot />
    </div>
</template>

<style scoped></style>
