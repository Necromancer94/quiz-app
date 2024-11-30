<script setup>

import { useQuizStore } from '@/stores/state';

const quizStore = useQuizStore()

const props = defineProps({

    errorText: {
        type: String,
        required: true,
    }
})

</script>

<template>

    <div v-if="quizStore.state.isErrorVisible" class="error-container">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor"
                d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3M12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m1 4h-2v-2h2z" />
        </svg>
        <span> {{ errorText }} </span>
    </div>

</template>


<style scoped>
@keyframes slide-in {
    from {
        top: 80px;
        opacity: 0;
    }

    to {
        top: 0px;
        opacity: 1;
    }
}

.error-container {
    box-shadow: var(--shadow);
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    margin-top: 2.5rem;
    padding: 0.5rem 1rem;
    color: var(--red);
    background-color: rgba(239, 68, 68, 0.2);
    font-weight: 600;
    width: max-content;
    border-radius: var(--rounded);
    animation: slide-in 0.2s ease-in-out;
}

@media screen and (max-width: 768px) {

    .error-container {
        width: 100%;
    }

}
</style>