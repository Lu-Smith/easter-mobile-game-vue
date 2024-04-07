import Enemy from './enemy';
import Game from './game';

export default class Eggs extends Enemy {
    image: HTMLImageElement;
    frameX: number;
    frameY1: number;
    frameY2: number;
    frameY3: number;
    frameY4: number;
    lives: number;
    maxFrame: number;
    maxLives: number;

    constructor(game: Game, positionX: number, positionY: number) {
        super(game, positionX, positionY);
        this.image = document.getElementById('eggs') as HTMLImageElement; 
        this.frameX = 0;
        this.maxFrame = 2;
        this.frameY1 = 0;
        this.frameY2 = 0.72;
        this.frameY3 = 1.44;
        this.frameY4 = 2.16;
        this.lives = 2;
        this.maxLives = this.lives;
    }
    resize() {
        if (this.lives === 1) this.image = document.getElementById('chicks') as HTMLImageElement;
        if (this.lives === 2) this.image = document.getElementById('eggs') as HTMLImageElement;
        
    }
}