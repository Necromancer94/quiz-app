import { ref } from "vue";
import { defineStore } from 'pinia'
import { useQuizStore } from "./state";

export const useTimerStore = defineStore('timer', () => {

    const timer = ref({
        started: false,
        finished: false,
        totalTime: 300_000, //5m 
        currentTime: 0
    })

    let interval = null

    function finishTimer() {
        clearInterval(interval)
        const quizStore = useQuizStore()
        quizStore.finishQuiz()
        timer.value.finished = true
    }

    function startTimer() {
        timer.value.started = true

        interval = setInterval(() => {
            timer.value.currentTime += 1000

            if (timer.value.currentTime >= timer.value.totalTime) {
                finishTimer()
            }

        }, 1000)
    }

    function resetTimer() {
        timer.value.started = false;
        timer.value.finished = false;
        timer.value.currentTime = 0;
        clearInterval(interval)
        interval = null
    }

    return { timer, startTimer, finishTimer, resetTimer }
})