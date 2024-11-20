import { ref } from "vue";
import { questions } from "@/data/questions";
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', () => {

    const state = ref({
        status: 'start',
        currentSlide: 1,
        totalSlides: questions.length,
        currentPoints: 0,
        totalPoints: questions.length * 10,
        selectedOption: null,
        formSubmitted: localStorage.getItem('formSubmitted') ?? false,
        isErrorVisible: false,
        userAnswers: [],
    })

    function incrementSlide() {
        ++state.value.currentSlide
    }

    function decrementSlide() {
        --state.value.currentSlide
    }

    function startQuiz() {
        state.value.status = 'in progress'
    }

    function finishQuiz() {
        localStorage.setItem('formSubmitted', true)
        state.value.status = 'finish'

        const correctAnswers = questions.map((question => question.correctAnswer))

        state.value.userAnswers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                state.value.currentPoints += 10
            }
        })
    }

    function restartQuiz() {
        state.value.status = 'start'
        state.value.currentPoints = 0
        state.value.currentSlide = 1
        state.value.userAnswers = []
    }

    function isLastSlide() {
        return state.value.currentSlide === state.value.totalSlides
    }

    function isFirstSlide() {
        return state.value.currentSlide === 1
    }

    function addData() {

        const data = state.value.selectedOption

        const currentAnswer = state.value.userAnswers[state.value.currentSlide - 1]

        if (currentAnswer) {
            const currentIndex = state.value.userAnswers.indexOf(currentAnswer)
            state.value.userAnswers.splice(currentIndex, 1, data)
        }

        else {
            state.value.userAnswers.push(data)
        }
    }

    return { state, incrementSlide, decrementSlide, startQuiz, finishQuiz, restartQuiz, isLastSlide, isFirstSlide, addData }
})