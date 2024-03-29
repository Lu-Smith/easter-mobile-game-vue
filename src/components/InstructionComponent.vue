<template>
    <div class="instructionsContainer">
        <button @click="showInstructions" v-if="!showInfo" class="infoButton">Instructions</button>
        <button @click="showInstructions" v-if="showInfo" class="infoButton">X </button>
        <div v-if="showInfo">
            <h3>Can you save the Eater Realm?</h3>
            <ol>
                <li> 
                    <h4>Shoot Easter Eggs to find evil fluffy Chicks.</h4>
                </li>
                <li>
                    <h4>Shoot down all evil Chicks before they will turn you into Easter Egg.</h4>
                </li>
                <li> 
                    <h4>Press <span>Enter</span> or <span>Space</span> key or <span>Tap</span> to shoot.</h4>
                </li>
                <li> 
                    <h4>Press <span>Left Arrow</span> or <span>swipe left</span> to move left.</h4>
                </li>
                <li> 
                    <h4>Press <span>Right Arrow</span> or <span>swipe right</span> to move right.</h4>
                </li>
            
                <li> 
                    <h4>Press <span>R</span> or <span>tap</span> to restart.</h4>
                </li>
            </ol>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const showInfo = ref(false);

const showInstructions = () => {
    showInfo.value = !showInfo.value;
}
</script>