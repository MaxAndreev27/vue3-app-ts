<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const message = computed(() => store.state.message);

enum TITLE_MAP {
    primary = 'Успіх!',
    danger = 'Помилка!',
    warning = 'Увага!',
}
type TitleKey = keyof typeof TITLE_MAP;
const titleType: TitleKey = message.value?.type;

const title = computed(() => {
    return message.value ? TITLE_MAP[titleType] : null;
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
