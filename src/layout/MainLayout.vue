<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import AppMessage from '@/components/ui/AppMessage.vue';
import TheSidebar from '@/components/TheSidebar.vue';
</script>

<template>
    <TheNavbar />
    <TheSidebar />
    <AppMessage />
    <div class="container with-nav">
        <router-view />
    </div>
</template>

<style scoped></style>
