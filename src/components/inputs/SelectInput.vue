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
        <fieldset>
            <div v-for="(answer, index) in questionObj.answers" :key="questionObj.id"
                @click="quizStore.storeSelected($event)" tabindex="0" @keydown.enter="quizStore.goForward">

                <div class="img-container" v-if="questionObj.imagePaths">
                    <img :src="questionObj.imagePaths[index]">
                </div>

                <div class="label-container">
                    <div class="radio-btn" :id="'opt' + (index + 1)" name="single-choice">
                        <div :class="quizStore.findAnswer(answer) ? 'radio-btn-active' : ''"></div>
                    </div>
                    <label :for="'opt' + (index + 1)"> {{ answer }} </label>
                </div>

            </div>
        </fieldset>
        <ErrorMessage :errorText="'Select an option before proceeding'"></ErrorMessage>
    </div>

</template>


<style scoped>
fieldset {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    background: white;
    border-radius: var(--rounded);
    border: none;
    width: 100%;

    &>div {
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
            transform: scale(1.005);
        }

        @media screen and (max-width:768px) {
            width: 100%;
            justify-content: space-between;
        }
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

.img-container {
    width: 5rem;

    @media screen and (max-width:768px) {
        order: 2;
        width: 3rem;
    }
}
</style>