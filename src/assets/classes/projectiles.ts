import Game from './game';

export default class Obstacle {
    game: Game; 
    spriteWidth: number;
    spriteHeight: number;
    scaledWidth: number;
    scaledHeight: number;

    constructor(game: Game) {
        this.game = game;
        this.spriteWidth = 20;
        this.spriteHeight = 20;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }
    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }
    draw(){
        this.game.context.beginPath();
        this.game.context.arc(this.game.width * 0.5, this.game.height * 0.15, 
            this.scaledHeight, 0, Math.PI * 2);
        this.game.context.stroke();
    }

}