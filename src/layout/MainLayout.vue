<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import AppMessage from '@/components/ui/AppMessage.vue';
</script>

<template>
    <TheNavbar />
    <AppMessage />
    <div class="container with-nav">
        <router-view />
    </div>
</template>

<style scoped></style>
