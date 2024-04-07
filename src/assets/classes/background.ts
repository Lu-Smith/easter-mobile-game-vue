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
        this.width = this.game.baseWidth;
        this.height = this.game.baseHeight;
        this.scaledWidth = this.width;
        this.scaledHeight = this.height;
        this.x = this.game.canvas.width * 0.05;
    }
    draw(context: CanvasRenderingContext2D){
        context.clearRect(0, 0, this.game.width, this.game.height);
        context.drawImage(this.image, 0, 0, this.scaledWidth, this.scaledHeight, this.x, 35, this.scaledWidth, this.scaledHeight);
    }
    resize() {
        this.scaledWidth = this.width * this.game.ratioWidth * 0.9;
        this.scaledHeight = this.height * this.game.ratio * 0.8;
        this.x = this.game.canvas.width * 0.05;
    }
}