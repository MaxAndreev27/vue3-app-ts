<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true,
        validator(value: string): boolean {
            return ['active', 'cancelled', 'done', 'pending'].includes(value);
        },
    },
});

interface IBadge {
    active: string;
    cancelled: string;
    done: string;
    pending: string;
}

const classesMap: IBadge = {
    active: 'primary',
    cancelled: 'danger',
    done: 'primary',
    pending: 'warning',
};

const textMap: IBadge = {
    active: 'Активен',
    cancelled: 'Отменен',
    done: 'Завершен',
    pending: 'Выполняется',
};

watch(props, (val) => {
    className.value = classesMap[val.type as keyof IBadge];
    text.value = textMap[val.type as keyof IBadge];
});

const className = ref(classesMap[props.type as keyof IBadge]);
const text = ref(textMap[props.type as keyof IBadge]);
</script>

<template>
    <span :class="['badge', className]">{{ text }}</span>
</template>

<style scoped></style>
