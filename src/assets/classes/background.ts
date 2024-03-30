import Game from './game';

export default class Background {
    game: Game;
    image: CanvasImageSource;
    width: number;
    height: number;
    x: number;
    scaledWidth: number;
    scaledHeight: number;
    background: string;

    constructor(game: Game) {
        this.game = game;
        this.background = 'background1';
        this.image = document.getElementById(this.background) as CanvasImageSource;
        this.width = 2400;
        this.height = this.game.baseHeight;
        this.scaledWidth = this.width;
        this.scaledHeight = this.height;
        this.x = 0;
    }
    draw(){
        this.game.context.drawImage(this.image, this.x , 0, this.scaledWidth, this.scaledHeight);
    }
    resize() {
        this.scaledWidth = this.width * this.game.ratio;
        this.scaledHeight = this.height * this.game.ratio;
        this.x = 0;
    }
}