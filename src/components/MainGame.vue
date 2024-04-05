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
        @click="newGame">Play Again</button>
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
let game: Game | null = null;   
const gameCanvas = ref<HTMLCanvasElement | null>(null);

const animate = (playingValue: boolean) => {
    let lastTimeStamp = performance.now();
    const context = gameCanvas.value?.getContext('2d');

    const loop = () => {
        const currentTimeStamp = performance.now();
        const deltaTime = playingValue ? currentTimeStamp - lastTimeStamp : 0;
        lastTimeStamp = currentTimeStamp;
 
        if (props.gameRunning && game) {
            if (context) game.render(context, deltaTime, playingValue);
            if (playing.value) {
                animationFrameId.value = requestAnimationFrame(loop);
            }
            if (game.gameOver) {
                playing.value = false;
            }
        }    
    }   
    if (playingValue) {
        animationFrameId.value = requestAnimationFrame(loop);
    }
}

const initializeCanvasAndAnimate = () => {
    if (gameCanvas.value) {
        gameCanvas.value.width = 1500;
        gameCanvas.value.height = 800;
        game = new Game(gameCanvas.value);
    }
    animate(playing.value);
}

const newGame = () => {
    playing.value = true;
    nextTick(initializeCanvasAndAnimate);
}

if (props.gameRunning) {
    newGame();
}

const startGame = () => {
    playing.value = true;
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