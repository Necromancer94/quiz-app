<script setup>

import ErrorMessage from '../ErrorMessage.vue';
import { onMounted } from 'vue';

import { useQuizStore } from '@/stores/state';
const quizStore = useQuizStore()
const state = quizStore.state

const props = defineProps({

    questionObj: {
        type: Object,
        required: true,
    }
})

onMounted(() => {
    quizStore.getCurrentAnswer()
})

</script>

<template>

    <div>
        <div class="range-container">
            <label for="range">Drag to the right number </label>
            <div>
                <span>{{ questionObj.rangeStart }}</span>
                <input @change="quizStore.storeData($event, questionObj.type)" @keydown.enter="quizStore.goForward()"
                    type="range" id="range" name="range" step="1" :min="questionObj.rangeStart"
                    :max="questionObj.rangeEnd" :value="state.selectedOption">
                <span>{{ questionObj.rangeEnd }}</span>
            </div>

            <p>Selected: {{ state.selectedOption }}</p>
        </div>
        <ErrorMessage :errorText="'Select a number before proceeding'"></ErrorMessage>
    </div>


</template>

<style scoped>
.range-container {

    flex-direction: column;
    display: flex;
    gap: 1rem;

    &>div {
        display: flex;
        gap: 0.5rem;
    }

    &>p {
        margin-top: 1rem;
    }
}

#range {
    max-width: 40rem;
    width: 50%;
    background: transparent;

    &:focus {
        outline: none;
    }

    @media screen and (max-width:768px) {
        width: 100%;
    }
}

input {
    margin-right: 8px;
}
</style>