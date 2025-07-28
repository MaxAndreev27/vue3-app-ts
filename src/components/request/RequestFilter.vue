<script setup lang="ts">
import { computed, defineEmits, ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const name = ref();
const status = ref();

watch([name, status], (values) => {
    emit('update:modelValue', {
        name: values[0],
        status: values[1],
    });
});

const isActive = computed(() => name.value || status.value);

const reset = () => {
    name.value = '';
    status.value = null;
};
</script>

<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Начните писать имя" v-model="name" />
        </div>
        <div class="form-control">
            <select v-model="status">
                <option disabled selected>Выберите статус</option>
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>
        <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
    </div>
</template>

<style scoped></style>
