import Game from './game';

export default class Player {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    spriteWidth: number;
    spriteHeight: number;

    constructor(game: Game) {
        this.game =  game;
        this.x = 100;
        this.y = 0;
        this.spriteWidth = 35;
        this.spriteHeight = 35;
        this.width = 0;
        this.height = 0;
    }
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
    }
    draw() {
        this.game.context.beginPath();
        this.game.context.arc(this.game.width * 0.5, this.game.height - (160 * this.game.ratio), 
            this.height, 0, Math.PI * 2);
        this.game.context.stroke();
    }
}