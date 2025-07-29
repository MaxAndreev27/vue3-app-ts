<script setup lang="ts">
import AppPage from '@/components/ui/AppPage.vue';
import QuestionItem from '@/components/question/QuestionItem.vue';

export interface IQuestion {
    title: string;
    text: string;
}

const questions: Array<IQuestion> = [
    {
        title: 'Что есть в данной системе?',
        text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял',
    },
    { title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase' },
];
</script>

<template>
    <AppPage title="Допомога" back>
        <QuestionItem v-for="q in questions" :question="q" :key="q.title" />
    </AppPage>
</template>
