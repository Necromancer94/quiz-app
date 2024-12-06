<script setup>

import RangeInput from './inputs/RangeInput.vue';
import NumberInput from './inputs/NumberInput.vue';
import TextInput from './inputs/TextInput.vue';
import SelectInput from './inputs/SelectInput.vue';

const props = defineProps({

    questionObj: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <div class="q-container">

        <h4>{{ questionObj.question }}</h4>
        <SelectInput v-if="questionObj.type === 'single'" :questionObj="questionObj"></SelectInput>
        <NumberInput v-if="questionObj.type === 'number-input'" :questionObj="questionObj"></NumberInput>
        <RangeInput v-if="questionObj.type === 'range'" :questionObj="questionObj"></RangeInput>
        <TextInput v-if="questionObj.type === 'textbox'" :questionObj="questionObj"></TextInput>

    </div>
</template>