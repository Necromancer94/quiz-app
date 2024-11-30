<script setup>

import { useTimerStore } from '@/stores/timer';
import { computed } from 'vue';

const timerStore = useTimerStore()

const remainingTime = computed(() => {
    return (timerStore.timer.totalTime - timerStore.timer.currentTime) / 1000
})

const remainingMinutes = computed(() => {
    const mins = Math.floor(remainingTime.value / 60)

    if (mins < 10) return "0" + mins

    else {
        return mins
    }
})

const remainingSeconds = computed(() => {
    const secs = remainingTime.value % 60

    if (secs < 10) return "0" + secs

    else {
        return secs
    }
})

</script>

<template>

    <div>
        <p> Time left:
            <span> {{ remainingMinutes + ":" + remainingSeconds }} </span>
        </p>
    </div>

</template>


<style scoped>
div {
    background-color: var(--grey);
    box-shadow: var(--shadow);
    width: fit-content;
    border-radius: var(--rounded);
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 500;
    margin: 1rem auto;
    padding: 1rem;
}

@media screen and (max-width: 768px) {
    div {
        margin: 0 0 2rem 0;
        padding: 0.8rem;
    }
}
</style>