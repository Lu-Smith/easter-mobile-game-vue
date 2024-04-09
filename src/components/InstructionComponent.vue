<template>
    <div :class="showInfo ? 'instructionsContainer' : 'instructionsContainerShow'">
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
                    <h4>Press <span>Left Arrow</span> or <span>Swipe Left</span> to move left.</h4>
                </li>
                <li> 
                    <h4>Press <span>Right Arrow</span> or <span>Swipe Right</span> to move right.</h4>
                </li>
            
                <li> 
                    <h4>Press <span>Play Again</span> to restart.</h4>
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

<style scoped>
    .instructionsContainerShow {
        border: 2px solid #70d8e8;
        padding: 15px 45px 50px 45px;
        border-radius: 50%;
        background-color: #efe296;
        background-image: radial-gradient(#70d8e8 25%, transparent 25%), radial-gradient(pink 18%, transparent 18%), radial-gradient(rgb(85, 156, 86) 78%, transparent 78%);
        background-size: 20px 23px; 
        background-position: 0 0, 25px 25px; 
        color: #1a1a1a;
    }

    .instructionsContainer {
        border: 2px solid #feffdf;
        padding: 15px 45px 50px 45px;
        border-radius: 50%;
        background-color: #f1e6ab;
        color: #1a1a1a;
    }

    .infoButton {
        color: #1a1a1a;;
        margin-bottom: 20px;
        background-color: #feffdf;
    }

    @media screen and (max-width: 786px) {
        .instructionsContainer {
            border: 1px solid #feffdf;
            padding: 10px 30px 40px 30px;
        }
    }

</style>