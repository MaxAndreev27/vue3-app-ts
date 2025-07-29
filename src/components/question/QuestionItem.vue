<script setup lang="ts">
import { ref, defineProps } from 'vue';
import IQuestion from '../../views/HelpView.vue';

defineProps({
    question: {
        type: IQuestion,
        required: true,
    },
});

const isOpen = ref(false);
</script>

<template>
    <div class="question" @click="isOpen = !isOpen">
        <div class="question-title">{{ question.title }}</div>
        <div class="question-body" v-if="isOpen">{{ question.text }}</div>
    </div>
</template>

<style scoped></style>
