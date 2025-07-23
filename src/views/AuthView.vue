<script setup lang="ts">
import { computed, watch } from 'vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const { handleSubmit, isSubmitting, submitCount } = useForm();

const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
} = useField('email', yup.string().trim().required().email());

const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
} = useField('password', yup.string().trim().required().min(6));

const isTooManyAttempts = computed(() => submitCount.value >= 3);

watch(isTooManyAttempts, (val) => {
    if (val) {
        setTimeout(() => (submitCount.value = 0), 2000);
    }
});

const onSubmit = handleSubmit(async (values) => {
    try {
        await store.dispatch('auth/login', values);
        router.push('/');
    } catch (e) {
        console.log(e);
    }
});
</script>

<template>
    <form class="card" @submit.prevent="onSubmit">
        <h1>Вхід в систему</h1>
        <div :class="['form-control', { invalid: eError }]">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" @blur="eBlur" />
            <small v-if="eError">{{ eError }}</small>
        </div>
        <div :class="['form-control', { invalid: pError }]">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" @blur="pBlur" />
            <small v-if="pError">{{ pError }}</small>
        </div>
        <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">
            Login
        </button>
        <div class="text-danger" v-if="isTooManyAttempts">
            Вы слишком часто пытаетесь войти в систему. Попробуйте позже
        </div>
    </form>
</template>

<style scoped></style>
