<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AppMessage from '@/components/ui/AppMessage.vue';
import { codeType, errorTranslate } from '@/utils/error';

const route = useRoute();
const store = useStore();
if (route.query.message) {
    store.dispatch(
        'setMessage',
        {
            value: errorTranslate(route.query.message as codeType),
            type: 'warning',
        },
        { root: true },
    );
}
</script>

<template>
    <AppMessage />
    <div class="container">
        <router-view />
    </div>
</template>

<style scoped></style>
