export default class Audio {
    shoot: HTMLAudioElement;
    lose: HTMLAudioElement;

    constructor() {
        this.shoot = document.getElementById('shoot') as HTMLAudioElement;
        this.lose = document.getElementById('lose') as HTMLAudioElement;
    }
    play(sound: HTMLAudioElement ) {
        sound.currentTime = 0;
        sound.play();
    }
}