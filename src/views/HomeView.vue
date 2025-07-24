<script setup lang="ts">
import { ref } from 'vue';
import AppPage from '@/components/ui/AppPage.vue';
import RequestTable from '@/components/request/RequestTable.vue';
import AppModal from '@/components/ui/AppModal.vue';
import RequestModal from '@/components/request/RequestModal.vue';

const modal = ref(false);
const close = () => {
    modal.value = false;
};
</script>

<template>
    <AppPage title="Список звявок">
        <template #title>
            <button class="btn primary" @click="modal = true">Створити</button>
        </template>
        <RequestTable :requests="[]" />

        <teleport to="body">
            <AppModal v-if="modal" title="Створити заявку" @close="modal = false">
                <RequestModal />
            </AppModal>
        </teleport>
    </AppPage>
</template>
