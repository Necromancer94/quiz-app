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
        <fieldset class="col">
            <label for="number-input"> Type your answer </label>
            <input :value="state.selectedOption" type="number" id="number-input" name="number-input" maxlength="4"
                @keyup="quizStore.storeNumber($event)" @keydown.enter="quizStore.goForward">
        </fieldset>
        <ErrorMessage :errorText="'Type a year before proceeding'"></ErrorMessage>
    </div>

</template>


<style scoped>
#number-input {
    width: max-content;

    @media screen and (max-width:768px) {
        min-height: 2rem;
    }
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

input {
    margin-right: 8px;
}
</style>