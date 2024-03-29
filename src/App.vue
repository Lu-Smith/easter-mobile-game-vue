<template>
  <div>
    <h1 v-if="!gameRunning" >East Bunny Hunt</h1>
    <DescriptionComponent v-if="!gameRunning" />
    <button @click="startNewGame" v-if="!gameRunning">Start</button>
    <MainGame v-if="gameRunning" :gameRunning="gameRunning"/>
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
</script>

<style scoped>
</style>
