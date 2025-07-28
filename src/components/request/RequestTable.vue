<script setup lang="ts">
import { defineProps } from 'vue';
import { currency } from '@/utils/currency';
import AppStatus from '@/components/ui/AppStatus.vue';
const props = defineProps({
    requests: {
        type: Array,
    },
});
</script>

<template>
    <h3 v-if="requests.length == 0" class="text-center">Заявок нема</h3>
    <table v-else class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Піб</th>
                <th>Phone</th>
                <th>Сума</th>
                <th>Статус</th>
                <th>Дія</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(r, idx) in requests" :key="r.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ r.fio }}</td>
                <td>{{ r.phone }}</td>
                <td>{{ currency(r.amount) }}</td>
                <td><AppStatus :type="r.status" /></td>
                <td>
                    <!--                    <router-link-->
                    <!--                        v-slot="{ navigate }"-->
                    <!--                        custom-->
                    <!--                        :to="{ name: 'Request', params: { id: r.id } }"-->
                    <!--                    >-->
                    <button class="btn" @click="navigate">Открыть</button>
                    <!--                    </router-link>-->
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
