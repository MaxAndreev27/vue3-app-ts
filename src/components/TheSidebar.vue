<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const sidebar = computed(() => store.state.sidebar);
const close = () => {
    store.commit('closeSidebar');
};
</script>

<template>
    <div class="sidebar" v-if="sidebar">
        <span class="sidebar-close" @click="close">&times;</span>

        <div class="sidebar-content">
            <p>
                Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете
                исчерпывающую информацию про систему и заявки
            </p>
        </div>
    </div>
</template>

<style scoped></style>
