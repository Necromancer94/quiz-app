<script setup>

import { useQuizStore } from '@/stores/state';

const quizStore = useQuizStore()

function calcWidth() {
    const currentWidth = 100 / (quizStore.state.totalSlides / quizStore.state.currentSlide)
    return currentWidth + '%'
}

</script>

<template>

    <p>Question {{ quizStore.state.currentSlide }} of {{ quizStore.state.totalSlides }}</p>
    <div class="progress-bar-container">
        <div class="bar-full">
            <div :style="'width:' + calcWidth()" class="bar-progress"></div>
        </div>
    </div>

</template>


<style scoped>
p {
    margin-bottom: 1.25rem;
    font-weight: 500;
}

div {
    border-radius: var(--rounded);
}

h4 {
    margin-bottom: 20px;
}

.progress-bar-container {
    margin-bottom: 40px;
}

.bar-full {
    width: 100%;
    background: var(--grey);
    min-height: 20px;
}

.bar-progress {
    background: var(--blue);
    min-height: 20px;
}
</style>