import { ref } from "vue";
import { questions } from "@/data/questions";
import { defineStore } from 'pinia'
import { useTimerStore } from "./timer";

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

        const timerStore = useTimerStore()
        timerStore.startTimer()
    }

    function finishQuiz() {
        localStorage.setItem('formSubmitted', true)
        state.value.status = 'finish'

        const correctAnswers = questions.map((question => question.correctAnswer))

        state.value.userAnswers.forEach((answer, index) => {

            if (Array.isArray(answer)) {

                let checkedAnswers = 0

                for (const variant of answer) {
                    const found = correctAnswers[index].includes(variant)
                    checkedAnswers = found ? ++checkedAnswers : checkedAnswers
                }

                if (correctAnswers[index].length === checkedAnswers) {
                    state.value.currentPoints += 10
                }

            }

            if (answer === correctAnswers[index]) {
                state.value.currentPoints += 10
            }
        })

        const timerStore = useTimerStore()
        timerStore.resetTimer()
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

    function goForward() {

        if (state.value.currentSlide === state.value.totalSlides && state.value.selectedOption && state.value.formSubmitted) {
            addData()
            finishQuiz()
        }

        else if (state.value.currentSlide === state.value.totalSlides && state.value.selectedOption) {
            addData()
            state.value.status = 'verification'
        }

        else if (state.value.selectedOption) {
            addData()
            incrementSlide()
        }

        else {
            state.value.isErrorVisible = true
        }
    }

    function findAnswer(targetAnswer) {
        if (state.value.selectedOption) return state.value.selectedOption === targetAnswer

        const currentAnswer = state.value.userAnswers[state.currentSlide - 1]
        return currentAnswer === targetAnswer
    }

    function findAnswers(targetAnswer) {

        if (Array.isArray(state.value.selectedOption)) {
            return state.value.selectedOption.some((answer => answer === targetAnswer))
        }

        return false
    }

    function getCurrentAnswer() {
        state.value.selectedOption = state.value.userAnswers[state.value.currentSlide - 1] ?? null
    }

    function storeSelected(event) {
        let option = event.currentTarget.querySelector('label').textContent
        state.value.selectedOption = option
    }

    function storeNumber(event) {

        let input = event.target.value

        if (parseInt(input) > parseInt(event.target.getAttribute('maxlength'))) {
            input = input.slice(0, 4)
        }

        if (parseInt(input) < 0 || isNaN(parseInt(input))) {
            input = ''
        }

        event.target.value = input
        state.value.selectedOption = input
    }

    function storeRangeValue(event) {
        state.value.selectedOption = parseInt(event.target.value)
    }

    function storeText(event) {
        let input = event.target.value
        const lowercased = input.toLowerCase()
        const normalizedInput = lowercased.replace(lowercased[0], lowercased[0].toUpperCase())

        event.target.value = normalizedInput
        state.value.selectedOption = normalizedInput
    }

    function storeAllSelected(event) {
        let option = event.currentTarget.querySelector('label').textContent

        if (state.value.selectedOption?.length) {

            if (state.value.selectedOption.some((singleOption) => singleOption === option)) {
                state.value.selectedOption.splice(state.value.selectedOption.indexOf(option), 1)
            }

            else {
                state.value.selectedOption.push(option)
            }

            return
        }

        state.value.selectedOption = []
        state.value.selectedOption.push(option)
    }


    return {
        state, incrementSlide, decrementSlide, startQuiz,
        finishQuiz, restartQuiz, isLastSlide, isFirstSlide,
        addData, goForward, findAnswer, getCurrentAnswer,
        findAnswers, storeSelected, storeNumber, storeRangeValue, storeText, storeAllSelected
    }
})