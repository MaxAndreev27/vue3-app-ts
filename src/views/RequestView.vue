<script setup lang="ts">
import AppPage from '@/components/ui/AppPage.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AppLoader from '@/components/ui/AppLoader.vue';
import { currency } from '@/utils/currency';
import AppStatus from '@/components/ui/AppStatus.vue';
import { IRequest } from '@/store/modules/request.module';

const router = useRouter();

const store = useStore();
const request = ref<IRequest>({});
const route = useRoute();
const id = route.params.id;
const loading = ref(true);

const status = ref();

onMounted(async () => {
    loading.value = true;
    request.value = await store.dispatch('request/loadOne', id);
    status.value = request.value.status;
    loading.value = false;
});

const hasChanges = computed(() => request.value.status !== status.value);

const remove = async () => {
    console.log('remove');
    await store.dispatch('request/remove', id);
    router.push('/');
};

const update = async () => {
    console.log('update');
    const data = { ...request.value, status: status.value, id: id };
    await store.dispatch('request/update', data);
    request.value.status = status.value;
};
</script>

<template>
    <AppLoader v-if="loading" />
    <AppPage title="Заявка" back v-else-if="request">
        <p><strong>ПІБ</strong>: {{ request.fio }}</p>
        <p><strong>Телефон</strong>: {{ request.phone }}</p>
        <p><strong>Сума</strong>: {{ currency(request.amount) }}</p>
        <p><strong>Статус</strong>: <AppStatus :type="request.status" /></p>

        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn danger" @click="remove">Видалити</button>
        <button class="btn" @click="update" v-if="hasChanges">Оновити</button>
    </AppPage>
    <div class="card" v-else>
        <h3 class="text-center">Заявки с ID: {{ id }} немає.</h3>
    </div>
</template>

<style scoped></style>
