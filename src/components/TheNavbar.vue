<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const logout = () => {
    store.commit('auth/logout');
    router.push('/auth');
};

const openSidebar = () => {
    store.commit('openSidebar');
};
</script>

<template>
    <nav class="navbar">
        <h3>OnlineBank</h3>
        <ul class="navbar-menu">
            <li><router-link to="/">Заявки</router-link></li>
            <li><router-link to="/help">Допомога</router-link></li>
            <li><a href="#" @click.prevent="openSidebar">Повідомлення</a></li>
            <li><a href="#" @click.prevent="logout">Вихід</a></li>
        </ul>
    </nav>
</template>

<style scoped></style>
