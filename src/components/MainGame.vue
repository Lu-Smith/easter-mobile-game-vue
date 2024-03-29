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
        <AssetsComponent /> 
        <canvas ref="gameCanvas"></canvas>
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
const lastTime = ref(0);
const deltaTime = ref(0);
let game: Game | null = null;   
const gameCanvas = ref<HTMLCanvasElement | null>(null);

const animate = (playingValue: boolean) => {
    const loop = (timeStamp: number) => {
            deltaTime.value = timeStamp - lastTime.value;
            lastTime.value = timeStamp;
        if (props.gameRunning && game) {
            console.log(playingValue);
            game.render(deltaTime.value, playingValue);
            if (playing.value) {
                animationFrameId.value = requestAnimationFrame(loop);
            }
            if (game.gameOver) {
                resetGame();
            }
        }    
    }   
    animationFrameId.value = requestAnimationFrame(loop);

}

const initializeCanvasAndAnimate = () => {
    const context = gameCanvas.value?.getContext('2d');
    if (context && gameCanvas.value) {
        gameCanvas.value.width = 720;
        gameCanvas.value.height = 720;
        game = new Game(gameCanvas.value, context);
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

const resetGame = () => {
    playing.value = true;
    reset.value = true;
    nextTick(initializeCanvasAndAnimate);
}

</script>