export default class Audio {
    shoot: HTMLAudioElement;
    lose: HTMLAudioElement;
    crack: HTMLAudioElement;
    die: HTMLAudioElement;

    constructor() {
        this.shoot = document.getElementById('shoot') as HTMLAudioElement;
        this.lose = document.getElementById('lose') as HTMLAudioElement;
        this.crack = document.getElementById('crack') as HTMLAudioElement;
        this.die = document.getElementById('die') as HTMLAudioElement;
    }
    play(sound: HTMLAudioElement ) {
        sound.currentTime = 0;
        sound.play();
    }
}