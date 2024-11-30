<script setup>

import { useQuizStore } from '@/stores/state';
import ErrorMessage from './ErrorMessage.vue';
import { onMounted, ref } from 'vue';

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

        event.target.value = input
        state.selectedOption = input
    }

    if (inputType === 'single') {
        let option = event.currentTarget.querySelector('label').textContent
        state.selectedOption = option
    }

    if (inputType === 'range') {
        state.selectedOption = parseInt(event.target.value)
        selectedVal.value = parseInt(event.target.value)
    }

    if (inputType === 'textbox') {

        let input = event.target.value
        const lowercased = input.toLowerCase()
        const normalizedInput = lowercased.replace(lowercased[0], lowercased[0].toUpperCase())

        event.target.value = normalizedInput
        state.selectedOption = normalizedInput
    }
}

function findAnswer(targetAnswer) {
    if (state.selectedOption) return state.selectedOption === targetAnswer

    const currentAnswer = state.userAnswers[state.currentSlide - 1]
    return currentAnswer === targetAnswer
}

function findNum() {
    const currentAnswer = state.userAnswers[state.currentSlide - 1]
    return currentAnswer ?? ''
}

function findText() {
    const currentAnswer = state.userAnswers[state.currentSlide - 1]
    if (currentAnswer) return currentAnswer
}

onMounted(() => {
    state.selectedOption = state.userAnswers[state.currentSlide - 1] ?? null
})

const selectedVal = ref(findNum())

</script>

<template>

    <div class="q-container">

        <h4>{{ questionObj.question }}</h4>

        <div v-if="questionObj.type === 'single'">
            <fieldset>
                <div v-for="(answer, index) in questionObj.answers" :key="questionObj.id"
                    @click="storeData($event, questionObj.type)">

                    <div class="img-container" v-if="questionObj.imagePaths">
                        <img :src="questionObj.imagePaths[index]">
                    </div>

                    <div class="label-container">
                        <div class="radio-btn" :id="'opt' + (index + 1)" name="single-choice">
                            <div :class="findAnswer(answer) ? 'radio-btn-active' : ''"></div>
                        </div>
                        <label :for="'opt' + (index + 1)"> {{ answer }} </label>
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

        <div v-if="questionObj.type === 'range'">

            <div class="range-container">
                <label for="range">Drag to the right number </label>
                <div>
                    <span>{{ questionObj.rangeStart }}</span>
                    <input @change="storeData($event, questionObj.type)" :value="findNum()" type="range" id="range"
                        name="range" step="1" :min="questionObj.rangeStart" :max="questionObj.rangeEnd">
                    <span>{{ questionObj.rangeEnd }}</span>
                </div>

                <p>Selected: {{ selectedVal }}</p>
            </div>
            <ErrorMessage :errorText="'Select a number before proceeding'"></ErrorMessage>
        </div>

        <div v-if="questionObj.type === 'textbox'">

            <div class="text-input-container">
                <label for="textbox"> Type your answer</label>
                <input @change="storeData($event, questionObj.type)" :value="findText()" type="text" name="textbox"
                    id="textbox">
            </div>

            <ErrorMessage :errorText="'Type something before proceeding'"></ErrorMessage>
        </div>


    </div>

</template>


<style scoped>
.range-container,
.text-input-container {
    flex-direction: column;
    display: flex;
    gap: 1rem;
}

.range-container>div {
    display: flex;
    gap: 0.5rem;
}

.range-container>p {
    margin-top: 1rem;
}

#range {
    max-width: 40rem;
    width: 50%;
    background: transparent;
}

#range:focus {
    outline: none;
}

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
    cursor: pointer;

    &:hover {
        border: 0.5px solid var(--blue);
        scale: 1.005;
    }
}

.label-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
}

.radio-btn {
    width: 1.2rem;
    height: 1.2rem;
    background-color: white;
    border: 1px solid var(--grey);
    border-radius: 50%;
    position: relative;
}

.radio-btn-active {
    background-color: var(--blue);
    border-color: var(--blue);
    width: 60%;
    height: 60%;
    border-radius: 50%;
    position: absolute;
    inset: 50% 50%;
    transform: translate(-50%, -50%);
}

input {
    margin-right: 8px;
}

@media screen and (max-width: 768px) {

    fieldset>div {
        width: 100%;
    }

    .img-container {
        order: 2;
    }

    input[type='number'],
    .text-input-container>input {
        min-height: 2rem;
    }

    input[type='range'] {
        width: 100%;
    }

    main {
        min-height: 100svh;
    }



}
</style>