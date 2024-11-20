<script setup>

import { useQuizStore } from '@/stores/state';

const quizStore = useQuizStore()
const state = quizStore.state

function goNext() {

    if (state.currentSlide === state.totalSlides && state.selectedOption && state.formSubmitted) {
        quizStore.addData()
        quizStore.finishQuiz()
    }

    else if (state.currentSlide === state.totalSlides && state.selectedOption) {
        quizStore.addData()
        state.status = 'verification'
    }

    else if (state.selectedOption) {
        quizStore.addData()
        quizStore.incrementSlide()
    }

    else {
        state.isErrorVisible = true
    }
}

</script>

<template>

    <div class="btn-container">

        <button :class="quizStore.isFirstSlide() ? 'inactive' : ''" @click="quizStore.decrementSlide()"
            class="prev-btn">
            Previous
        </button>

        <button @click="goNext" class="next-btn">
            {{ quizStore.isLastSlide() ? 'Finish' : 'Next' }}
        </button>

    </div>

</template>


<style scoped>
.btn-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 2rem 0;
}

.next-btn {
    background-color: var(--blue);
    color: white;

    &:hover {
        box-shadow: 0 16px 31px -16px #4068F4;
        background: #2d59f3;
        scale: 1.05;
    }
}

.prev-btn {
    background-color: #ebebeb;

    &:hover {
        background-color: var(--grey);
        box-shadow: 8px 8px 28px 8px #3232320f;
        scale: 1.05;
    }
}

.inactive {
    pointer-events: none;
    font-weight: normal;
    background: var(--grey);
    color: black;
    text-decoration: line-through;
}
</style>