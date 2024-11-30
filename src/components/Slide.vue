<script setup>

import { onMounted } from 'vue';
import { useQuizStore } from '@/stores/state';

const quizStore = useQuizStore()
const state = quizStore.state

onMounted(() => {
    state.isErrorVisible = false
})

</script>

<template>

    <section>
        <div class="slide-container">
            <slot></slot>
        </div>

    </section>

</template>


<style scoped>
section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0.2px solid var(--grey);
    border-radius: var(--rounded);
    width: 100%;
    height: 100%;
    max-width: 1440px;
    padding: 2rem;
    margin-bottom: 60px;
    background: white;
    box-shadow: var(--shadow);
}

.slide-container {
    display: flex;
    flex-direction: column;
    width: inherit;
    height: inherit;
    max-width: inherit;
}
</style>