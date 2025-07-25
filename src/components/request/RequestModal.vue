<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from 'vuex';
import { defineEmits } from 'vue';
import { TaskStatus } from '@/store/modules/request.module';

const { handleSubmit, isSubmitting } = useForm({
    initialValues: {
        status: TaskStatus.ACTIVE,
    },
});

const {
    value: fio,
    errorMessage: fError,
    handleBlur: fBlur,
} = useField('fio', yup.string().trim().required('Введіть ПІБ'));

const {
    value: phone,
    errorMessage: pError,
    handleBlur: pBlur,
} = useField('phone', yup.string().trim().required('Введіть телефон'));

const {
    value: amount,
    errorMessage: aError,
    handleBlur: aBlur,
} = useField(
    'amount',
    yup.number().required('Введіть сумму').min(0, 'Сумма повинна бути більше 0'),
);

const { value: status } = useField('status');

const store = useStore();
const emit = defineEmits(['created']);

const onSubmit = handleSubmit(async (values) => {
    await store.dispatch('request/create', values);
    emit('created');
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{ invalid: fError }">
            <label for="fio">ФИО</label>
            <input type="text" id="fio" v-model="fio" @blur="fBlur" />
            <small v-if="fError">{{ fError }}</small>
        </div>

        <div class="form-control" :class="{ invalid: pError }">
            <label for="phone">Телефон</label>
            <input type="text" id="phone" v-model="phone" @blur="pBlur" />
            <small v-if="pError">{{ pError }}</small>
        </div>

        <div class="form-control" :class="{ invalid: aError }">
            <label for="amount">Суммы</label>
            <input type="number" id="amount" v-model.number="amount" @blur="aBlur" />
            <small v-if="aError">{{ aError }}</small>
        </div>

        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="status">
                <option :value="TaskStatus.DONE">Завершен</option>
                <option :value="TaskStatus.CANCELLED">Отменен</option>
                <option :value="TaskStatus.ACTIVE">Активен</option>
                <option :value="TaskStatus.PENDING">Выполняется</option>
            </select>
        </div>

        <button class="btn primary" :disabled="isSubmitting">Создать</button>
    </form>
</template>

<style scoped></style>
