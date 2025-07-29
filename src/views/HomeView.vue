<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AppPage from '@/components/ui/AppPage.vue';
import RequestTable from '@/components/request/RequestTable.vue';
import AppModal from '@/components/ui/AppModal.vue';
import RequestModal from '@/components/request/RequestModal.vue';
import { useStore } from 'vuex';
import AppLoader from '@/components/ui/AppLoader.vue';
import RequestFilter from '@/components/request/RequestFilter.vue';
import { IPayload } from '@/store/modules/request.module';

interface IFilter {
    name: string;
    status: string;
}

const modal = ref(false);
const loading = ref(false);
const filter = ref<IFilter>({ name: '', status: '' });

const close = () => {
    modal.value = false;
};
const store = useStore();
const requests = computed(() =>
    store.getters['request/requests']
        .filter((request: IPayload) => {
            if (filter.value.name) {
                return request.fio.includes(filter.value.name);
            }
            return request;
        })
        .filter((request: IPayload) => {
            if (filter.value.status) {
                return filter.value.status === request.status;
            }
            return request;
        }),
);

onMounted(async () => {
    loading.value = true;
    await store.dispatch('request/load');
    loading.value = false;
});
</script>

<template>
    <AppLoader v-if="loading" />
    <AppPage title="Список звявок" v-else>
        <template #title>
            <button class="btn primary" @click="modal = true">Створити</button>
        </template>

        <RequestFilter v-model="filter" />

        <RequestTable :requests="requests" />

        <teleport to="body">
            <AppModal v-if="modal" title="Створити заявку" @close="modal = false">
                <RequestModal @created="modal = false" />
            </AppModal>
        </teleport>
    </AppPage>
</template>
