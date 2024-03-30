<template>
    <div class="gameContainer">
        <button 
        v-if="!playing"
        @click="startGame">Go</button>
        <button 
        v-if="playing"
        @click="pauseGame">Pause</button>
        <button 
        v-if="!playing"
        @click="resetGame">Play Again</button>
        <canvas ref="gameCanvas"></canvas>
        <AssetsComponent /> 
    </div>
</template>

<script setup lang="ts">
import AssetsComponent from './AssetsComponent.vue';
import { ref, nextTick } from 'vue';
import Game from '../assets/classes/game.ts';

const props = defineProps(['gameRunning']);

//game logic
const animationFrameId: { value?: number } = {};
const playing = ref(true);
const reset = ref(false);
let game: Game | null = null;   
const gameCanvas = ref<HTMLCanvasElement | null>(null);

const animate = (playingValue: boolean) => {
    let lastTimeStamp = performance.now();

    const loop = () => {
        const currentTimeStamp = performance.now();
        const deltaTime = playingValue ? currentTimeStamp - lastTimeStamp : 0;
        lastTimeStamp = currentTimeStamp;

        if (props.gameRunning && game) {
            game.render(deltaTime, playingValue);
            if (playing.value) {
                animationFrameId.value = requestAnimationFrame(loop);
            }
            if (game.gameOver) {
                resetGame();
            }
        }    
    }   
    if (playingValue) {
        animationFrameId.value = requestAnimationFrame(loop);
    }
}

const initializeCanvasAndAnimate = () => {
    const context = gameCanvas.value?.getContext('2d');
    if (context && gameCanvas.value) {
        gameCanvas.value.width = 1500;
        gameCanvas.value.height = 800;
        game = new Game(gameCanvas.value, context);
    }
    animate(playing.value);
}

const resetGame = () => {
    playing.value = true;
    reset.value = true;
    nextTick(initializeCanvasAndAnimate);
}

const newGame = () => {
    playing.value = true;
    resetGame();
    nextTick(initializeCanvasAndAnimate);
}

if (props.gameRunning) {
    newGame();
}

const startGame = () => {
    playing.value = true;
    reset.value = false;
    animate(playing.value);
}

const pauseGame = () => {
    playing.value = false;
    if (animationFrameId.value !== undefined) {
        cancelAnimationFrame(animationFrameId.value);
    }
    animate(playing.value);
}



</script>