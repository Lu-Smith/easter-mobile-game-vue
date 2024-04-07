import Game from './game';

export default class Background {
    game: Game;
    // image: CanvasImageSource;
    width: number;
    height: number;
    x: number;
    scaledWidth: number;
    scaledHeight: number;
    // background: string;
    nextBackgroundAlpha: number;
    y: number;
    gradient: CanvasGradient | null;

    constructor(game: Game) {
        this.game = game;
        // this.background = 'background1';
        // this.image = document.getElementById(this.background) as CanvasImageSource;
        this.width = this.game.baseWidth;
        this.height = this.game.baseHeight;
        this.scaledWidth = this.width;
        this.scaledHeight = this.height;
        this.x = this.game.canvas.width * 0.05;
        this.y = 0;
        this.nextBackgroundAlpha = 0;
        this.gradient = null;
    }   
    update(){
        this.y -= this.game.speed;
        if (this.y <= 10) this.y = this.scaledHeight;
    }
    draw(context: CanvasRenderingContext2D){
        context.save();
        context.clearRect(0, 0, this.game.width, this.game.height);

        //main background
   
        context.fillStyle = 'black';
        context.fillRect(this.x, 35, this.scaledWidth, this.scaledHeight);

        this.gradient = context.createRadialGradient(this.width/4, this.height/2, 250, this.width/4, this.height/2, 500);
        this.gradient.addColorStop(0, '#ffffff');
        this.gradient.addColorStop(0.6, '#fce38a');
        this.gradient.addColorStop(1, '#eeeeee');

        context.fillStyle = this.gradient;

        // Draw the first star
        context.beginPath();
        context.moveTo(this.x + 10, this.y + 15);
        context.lineTo(this.x + 12, this.y + 20);
        context.lineTo(this.x + 17, this.y + 21);
        context.lineTo(this.x + 14, this.y + 25);
        context.lineTo(this.x + 15, this.y + 30);
        context.lineTo(this.x + 10, this.y + 27.5);
        context.lineTo(this.x + 5, this.y + 30);
        context.lineTo(this.x + 6, this.y + 25);
        context.lineTo(this.x + 3, this.y + 21);
        context.lineTo(this.x + 8, this.y + 20);
        context.closePath();
        context.fill();
        
        // Draw the second star
        context.beginPath();
        context.moveTo(this.x * 4 + 20, this.y * 1.3 + 33);
        context.lineTo(this.x * 4 + 24, this.y * 1.3 + 40);
        context.lineTo(this.x * 4 + 34, this.y * 1.3 + 42);
        context.lineTo(this.x * 4 + 28, this.y * 1.3 + 50);
        context.lineTo(this.x * 4 + 30, this.y * 1.3 + 60);
        context.lineTo(this.x * 4 + 22, this.y * 1.3 + 55);
        context.lineTo(this.x * 4 + 10, this.y * 1.3 + 60);
        context.lineTo(this.x * 4 + 12, this.y * 1.3 + 50);
        context.lineTo(this.x * 4 + 6, this.y * 1.3 + 42);
        context.lineTo(this.x * 4 + 16, this.y * 1.3 + 40);
        context.closePath();
        context.fill();
        context.restore();

        // Draw the third star
        context.beginPath();
        context.moveTo(this.x * 7 + 10, this.y * 1.8 + 15);
        context.lineTo(this.x * 7 + 12, this.y * 1.8 + 20);
        context.lineTo(this.x * 7 + 17, this.y * 1.8 + 21);
        context.lineTo(this.x * 7 + 14, this.y * 1.8 + 25);
        context.lineTo(this.x * 7 + 15, this.y * 1.8 + 32);
        context.lineTo(this.x * 7 + 10, this.y * 1.8 + 27.5);
        context.lineTo(this.x * 7 + 5, this.y * 1.8 + 30);
        context.lineTo(this.x * 7 + 6, this.y * 1.8 + 25);
        context.lineTo(this.x * 7 + 3, this.y * 1.8 + 21);
        context.lineTo(this.x * 7 + 8, this.y * 1.8 + 20);
        context.closePath();
        context.fill();

        // Draw the four star
        context.beginPath();
        context.moveTo(this.x * 11.4 + 10, this.y * 1.4 + 15);
        context.lineTo(this.x * 11.4 + 12, this.y * 1.4 + 20);
        context.lineTo(this.x * 11.4 + 18, this.y * 1.4 + 21);
        context.lineTo(this.x * 11.4 + 14, this.y * 1.4 + 25);
        context.lineTo(this.x * 11.4 + 15, this.y * 1.4 + 30);
        context.lineTo(this.x * 11.4 + 10, this.y * 1.4 + 27.5);
        context.lineTo(this.x * 11.4 + 5, this.y * 1.4 + 30);
        context.lineTo(this.x * 11.4 + 6, this.y * 1.4 + 25);
        context.lineTo(this.x * 11.4 + 3, this.y * 1.4 + 21);
        context.lineTo(this.x * 11.4 + 8, this.y * 1.4 + 20);
        context.closePath();
        context.fill();

        // Draw the fifth star
        context.beginPath();
        context.moveTo(this.x * 18 + 20, this.y * 2.4 + 33);
        context.lineTo(this.x * 18 + 24, this.y * 2.4 + 40);
        context.lineTo(this.x * 18 + 34, this.y * 2.4 + 42);
        context.lineTo(this.x * 18 + 28, this.y * 2.4 + 50);
        context.lineTo(this.x * 18 + 30, this.y * 2.4 + 60);
        context.lineTo(this.x * 18 + 22, this.y * 2.4 + 55);
        context.lineTo(this.x * 18 + 10, this.y * 2.4 + 60);
        context.lineTo(this.x * 18 + 12, this.y * 2.4 + 50);
        context.lineTo(this.x * 18 + 6, this.y * 2.4 + 42);
        context.lineTo(this.x * 18 + 16, this.y * 2.4 + 40);
        context.closePath();
        context.fill();
        context.restore();
    }
    resize() {
        this.scaledWidth = this.width * this.game.ratioWidth * 0.9;
        this.scaledHeight = this.height * this.game.ratio * 0.8;
        this.x = this.game.canvas.width * 0.05;
        this.y = 0;
    }
}