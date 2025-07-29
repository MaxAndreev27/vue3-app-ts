<script setup lang="ts">
import AppPage from '@/components/ui/AppPage.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AppLoader from '@/components/ui/AppLoader.vue';
import { currency } from '@/utils/currency';
import AppStatus from '@/components/ui/AppStatus.vue';

const store = useStore();
const request = ref({});
const route = useRoute();
const id = route.params.id;
const loading = ref(true);
onMounted(async () => {
    loading.value = true;
    request.value = await store.dispatch('request/loadOne', id);
    loading.value = false;
});
</script>

<template>
    <AppLoader v-if="loading" />
    <AppPage title="Заявка" back="true" v-else-if="request">
        <p><strong>ПІБ</strong>: {{ request.fio }}</p>
        <p><strong>Телефон</strong>: {{ request.phone }}</p>
        <p><strong>Сума</strong>: {{ currency(request.amount) }}</p>
        <p><strong>Статус</strong>: <AppStatus :type="request.status" /></p>
    </AppPage>
    <div class="card" v-else>
        <h3 class="text-center">Заявки с ID: {{ id }} немає.</h3>
    </div>
</template>

<style scoped></style>
