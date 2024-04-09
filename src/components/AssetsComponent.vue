<template>
    <div class="assets">
        <img src="../assets//media/images/eggs.png" alt="eggs" id="eggs" />
        <img src="../assets//media/images/chicks.png" alt="chicks" id="chicks" />
        <img src="../assets//media/images/player_Bunny.png" alt="bunny" id="player" />
        <audio :src=Shoot id="shoot"></audio>
        <audio :src=Lost id="lose"></audio>
        <audio :src=Crack id="crack"></audio>
        <audio :src=Die id="die"></audio>
    </div>
</template>

<script setup lang="ts">
    import Shoot from '../assets/media/sounds/shoot.wav';
    import Crack from '../assets/media/sounds/crack.wav';
    import Die from '../assets/media/sounds/die.wav';
    import Lost from '../assets/media/sounds/lose.wav';
</script>
