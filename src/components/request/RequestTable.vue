<script setup lang="ts">
import { defineProps } from 'vue';
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
            <tr>
                <td>c1</td>
                <td>c2</td>
                <td>c3</td>
                <td>c4</td>
                <td>c5</td>
                <td>c6</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
