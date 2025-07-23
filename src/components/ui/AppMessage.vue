<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const message = computed(() => store.state.message);

interface I_TITLE_MAP {
    primary: string;
    danger: string;
    warning: string;
}

const TITLE_MAP: I_TITLE_MAP = {
    primary: 'Успешно!',
    danger: 'Ошибка!',
    warning: 'Внимание!',
};

type keyType = 'primary' | ' danger' | 'warning';

// const title = computed(() => {
//     return message.value ? TITLE_MAP[message.value.type as keyType] : null;
// });
const title = computed(() => {
    return message.value ? TITLE_MAP['danger'] : null;
});

// const title = computed(() => (message.value ? message.value.type : null));
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
