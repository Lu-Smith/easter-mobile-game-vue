<template>
  <div class="App">
    <h1 v-if="!gameRunning"><span>Easter</span> Egg Hunt</h1>
    <DescriptionComponent v-if="!gameRunning" />
    <button @click="startNewGame" v-if="!gameRunning">Start</button>
    <MainGame v-if="gameRunning" :gameRunning="gameRunning" @toggleHome="toggleHome"/>
    <InstructionComponent v-if="!gameRunning" />
    <FooterComponent v-if="!gameRunning" />
  </div>
</template>

<script setup lang="ts">
import FooterComponent from './components/FooterComponent.vue';
import DescriptionComponent from './components/DescriptionComponent.vue';
import InstructionComponent from './components/InstructionComponent.vue';
import MainGame from './components/MainGame.vue';

import { ref } from 'vue';

const gameRunning = ref(false);

const startNewGame = () => {
  gameRunning.value = !gameRunning.value;
}

const toggleHome = () => {
  gameRunning.value = false;
}
</script>
