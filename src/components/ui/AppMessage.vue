<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const message = computed(() => store.state.message);

enum TITLE_MAP {
    primary = 'Успіх!' as any,
    danger = 'Помилка!' as any,
    warning = 'Увага!' as any,
}

const title = computed(() => {
    return message.value ? TITLE_MAP[message.value.type] : null;
});

function close() {
    store.commit('clearMessage');
}
</script>

<template>
    <div v-if="message" :class="['alert', message.type]">
        <p class="alert-title" v-if="title">{{ title }}</p>
        <p>{{ message.value }}</p>
        <span class="alert-close" @click="close">&times;</span>
    </div>
</template>

<style scoped></style>
