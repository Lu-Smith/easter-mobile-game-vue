<template>
    <div class="gameContainer">
        <button 
        v-if="playing"
        @click="startGame">Go</button>
        <button 
        v-if="!playing"
        @click="pauseGame">Pause</button>
        <button 
        v-if="playing"
        @click="resetGame">Play Again</button>
        <AssetsComponent /> 
        <canvas ref="gameCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import AssetsComponent from './AssetsComponent.vue';
import { ref } from 'vue';

//game logic
const animationFrameId: { value?: number } = {};
const playing = ref(true);
const reset = ref(false);
const lastTime = ref(0);
const deltaTime = ref(0);

const animate = () => {
    const loop = (timeStamp: number = 0) => {
        deltaTime.value = timeStamp - lastTime.value;
        lastTime.value = timeStamp;
    }
    animationFrameId.value = requestAnimationFrame(loop);
}

const startGame = () => {
    playing.value = !playing.value;
    reset.value = false;
    animate(); 
}

const pauseGame = () => {
    playing.value = !playing.value;
    if (animationFrameId.value !== undefined) {
        cancelAnimationFrame(animationFrameId.value);
    }
}

const resetGame = () => {
    playing.value = true;
    reset.value = true;
    startGame();
}

</script>