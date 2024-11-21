<script setup>
import Slide from '@/components/Slide.vue';
import QuizQuestion from '@/components/QuizQuestion.vue';
import { questions } from '@/data/questions';
import SlideNavigation from '@/components/SlideNavigation.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { useQuizStore } from '@/stores/state';

const quizStore = useQuizStore()
const state = quizStore.state

</script>

<template>

  <main>

    <Slide v-if="state.status === 'start'">
      <div>
        <h1>Welcome to the American history quiz</h1>
        <p style="margin-bottom: 1.5rem;">
          This quiz will test your knowledge of significant events, influential figures, and key policies that have
          shaped the United States.
        </p>
        <button @click="quizStore.startQuiz()">Start quiz</button>
      </div>
    </Slide>

    <div v-if="state.status === 'in progress'" v-for="question in questions" :key=question.id>
      <Slide v-if="question.id === state.currentSlide">
        <ProgressBar v-if="state.currentSlide <= state.totalSlides"></ProgressBar>
        <QuizQuestion :questionObj="question"></QuizQuestion>
        <SlideNavigation></SlideNavigation>
      </Slide>
    </div>

    <Slide v-if="state.status === 'verification'">
      <div>
        <h2>Fill in this short form to access the quiz results</h2>

        <form @submit.prevent="quizStore.finishQuiz()">
          <p> Since this is just a pet project, feel free to leave dummy data - it won't be stored anyway!</p>


          <div class="form-field">
            <label for="name">Full name </label>
            <input required type="text" id="name" placeholder="John Doe">
          </div>

          <div class="form-field">
            <label for="email">Email </label>
            <input required type="email" id="email" placeholder="johndoe@gmail.com">
          </div>

          <div>
            <input style="margin-right: 0.5rem;" required type="checkbox" id="legal">
            <label for="legal"> I agree with the Privacy Policy </label>
          </div>

          <button type="submit"> Submit </button>
        </form>
      </div>
    </Slide>

    <Slide v-if="state.status === 'finish'">
      <div>
        <h2>You've finished the quiz</h2>
        <p style="margin-bottom: 2rem;">
          You scored {{ state.currentPoints }} of {{ state.totalPoints }}.
        </p>
        <button @click="quizStore.restartQuiz()">Try again</button>
      </div>
    </Slide>

  </main>


</template>

<style scoped>
form>div {
  margin-bottom: 1.5rem;
}

form>p {
  margin-bottom: 2.5rem;
  max-width: 720px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-field>input {
  min-height: 40px;
  padding-left: 20px;
}

input {
  box-shadow: var(--shadow);
  border: 0.2px solid var(--grey);
  border-radius: var(--rounded);
}

button {
  background-color: var(--blue);
  min-width: 280px;
  color: white;
  margin-top: 1rem;
}

main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

main>div:not(.slide-container) {
  width: inherit;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  flex-direction: inherit;
}

@media screen and (max-width: 768px) {

  button {
    min-width: 100%;
  }

  main {
    min-height: 100svh;
  }

}
</style>
