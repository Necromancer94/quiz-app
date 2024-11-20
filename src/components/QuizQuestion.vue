<script setup>

import { useQuizStore } from '@/stores/state';
import ErrorMessage from './ErrorMessage.vue';
import { onMounted } from 'vue';

const quizStore = useQuizStore()
const state = quizStore.state

const props = defineProps({

    questionObj: {
        type: Object,
        required: true,
    }
})

function storeData(event, inputType) {
    if (inputType === 'number-input') {

        let input = event.target.value

        if (parseInt(input) > parseInt(event.target.getAttribute('maxlength'))) {
            input = input.slice(0, 4)
        }

        if (parseInt(input) < 0 || isNaN(parseInt(input))) {
            input = ''
        }

        state.selectedOption = input
    }

    if (inputType === 'single') {
        let option = event.target.parentNode.querySelector('label').textContent
        state.selectedOption = option
    }
}

function findAnswer(targetAnswer) {
    const currentAnswer = state.userAnswers[state.currentSlide - 1]
    return currentAnswer === targetAnswer
}

function findNum() {
    const currentAnswer = state.userAnswers[state.currentSlide - 1]
    return currentAnswer ?? ''
}

onMounted(() => {
    state.selectedOption = state.userAnswers[state.currentSlide - 1] ?? null
})

</script>

<template>

    <div class="q-container">

        <h4>{{ questionObj.question }}</h4>

        <div v-if="questionObj.type === 'single'">
            <fieldset>
                <div v-for="(answer, index) in questionObj.answers" :key="questionObj.id">

                    <div v-if="questionObj.imagePaths">
                        <img :src="questionObj.imagePaths[index]">
                    </div>

                    <div>
                        <input :checked="findAnswer(answer)" type="radio" :id="'opt' + questionObj.id"
                            name="single-choice" @change="storeData($event, questionObj.type)">
                        <label :for="'opt' + questionObj.id"> {{ answer }} </label>
                    </div>
                </div>
            </fieldset>
            <ErrorMessage :errorText="'Select an option before proceeding'"></ErrorMessage>
        </div>

        <div v-if="questionObj.type === 'number-input'">
            <fieldset class="col">
                <label for="number-input"> Type your answer </label>
                <input :value="findNum()" type="number" id="number-input" name="number-input" maxlength="4"
                    @keyup="storeData($event, questionObj.type)">
            </fieldset>
            <ErrorMessage :errorText="'Type a year before proceeding'"></ErrorMessage>
        </div>

    </div>

</template>


<style scoped>
fieldset img {
    width: 5rem;
}

#number-input {
    width: max-content;
}

.col {
    flex-direction: column;
}

fieldset {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    background: white;
    border-radius: var(--rounded);
    border: none;
    width: 100%;
}

fieldset>div {
    display: flex;
    align-items: center;
    gap: 2rem;
    box-shadow: var(--shadow);
    border: 0.2px solid var(--grey);
    border-radius: var(--rounded);
    background: white;
    width: 49%;
    padding: 16px;
}

input {
    margin-right: 8px;
}
</style>