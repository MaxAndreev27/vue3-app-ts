<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
</script>

<template>
    <TheNavbar />
    <div class="container with-nav">
        <div>Main Layout from layout</div>
        <router-view />
    </div>
</template>

<style scoped></style>
