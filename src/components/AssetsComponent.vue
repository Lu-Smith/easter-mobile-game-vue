<template>
    <div class="assets">
        <img src="../assets//media/images/eggs.png" alt="eggs" id="eggs" />
        <img src="../assets//media/images/chicks.png" alt="chicks" id="chicks" />
        <img src="../assets//media/images/player_Bunny.png" alt="bunny" id="player" />
        <audio :src=Shoot id="shoot"></audio>
        <audio :src=Lost id="lose"></audio>
    </div>
</template>

<script setup lang="ts">
    import Shoot from '../assets/media/sounds/shoot.wav';
    import Lost from '../assets/media/sounds/lose.wav';
</script>
