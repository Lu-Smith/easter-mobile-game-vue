<template>
    <div class="gameContainer">
        <div class="buttonsContainer">
            <button 
            v-if="!playing && !game?.gameOver"
            @click="startGame"
            class="go">Go</button>
            <button 
            v-if="playing"
            @click="pauseGame">Pause</button>
            <button 
            v-if="!playing"
            @click="newGame">Play Again</button>
        </div>
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

<style scoped>
    .gameContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
    }

    .buttonsContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 20px;
        margin-top: 15px;
    }

    button {
        background-color: #efe296;
        color: #1a1a1a;
        border: 2px solid #70d8e8;
    }

    .go {
        background-color: rgb(193, 21, 21);
        color: aliceblue;
        border: 2px solid #f12f2f;
    }
</style>