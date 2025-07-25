<script setup lang="ts">
import { computed, ref } from 'vue';
import AppPage from '@/components/ui/AppPage.vue';
import RequestTable from '@/components/request/RequestTable.vue';
import AppModal from '@/components/ui/AppModal.vue';
import RequestModal from '@/components/request/RequestModal.vue';
import { useStore } from 'vuex';

const modal = ref(false);
const close = () => {
    modal.value = false;
};
const store = useStore();
const requests = computed(() => store.getters['request/requests']);
</script>

<template>
    <AppPage title="Список звявок">
        <template #title>
            <button class="btn primary" @click="modal = true">Створити</button>
        </template>

        <RequestTable :requests="requests" />

        <teleport to="body">
            <AppModal v-if="modal" title="Створити заявку" @close="modal = false">
                <RequestModal @created="modal = false" />
            </AppModal>
        </teleport>
    </AppPage>
</template>
