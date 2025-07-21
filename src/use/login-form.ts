import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { computed, watch } from 'vue';
export function useLoginForm() {
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

    const onSubmit = handleSubmit((values) => {
        // console.log('Submitting', values);
    });

    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
    };
}
