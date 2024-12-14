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
        <div class="text-input-container">
            <label for="textbox"> Type your answer</label>
            <input @keydown.enter="quizStore.goForward" @change="quizStore.storeText($event)"
                v-model="state.selectedOption" type="text" name="textbox" id="textbox">
        </div>

        <ErrorMessage :errorText="'Type something before proceeding'"></ErrorMessage>
    </div>

</template>


<style scoped>
.text-input-container {
    flex-direction: column;
    display: flex;
    gap: 1rem;
}

.text-input-container>input {

    @media screen and (max-width: 768px) {
        min-height: 2rem;
    }
}

input {
    margin-right: 8px;
}
</style>