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
        context.moveTo(this.x * 4 + (20/3), this.y * 1.3 + (33/3));
        context.lineTo(this.x * 4 + (24/3), this.y * 1.3 + (40/3));
        context.lineTo(this.x * 4 + (34/3), this.y * 1.3 + (42/3));
        context.lineTo(this.x * 4 + (28/3), this.y * 1.3 + (50/3));
        context.lineTo(this.x * 4 + (30/3), this.y * 1.3 + (60/3));
        context.lineTo(this.x * 4 + (22/3), this.y * 1.3 + (55/3));
        context.lineTo(this.x * 4 + (10/3), this.y * 1.3 + (60/3));
        context.lineTo(this.x * 4 + (12/3), this.y * 1.3 + (50/3));
        context.lineTo(this.x * 4 + (6/3), this.y * 1.3 + (42/3));
        context.lineTo(this.x * 4 + (16/3), this.y * 1.3 + (40/3));
        context.closePath();
        context.fill();
        context.restore();

        // Draw the third star
        context.save(); 
        context.translate(this.x * 7 + 2, this.y * 1.8 + 3); 
        context.rotate((30 * Math.PI) / 160); 
        context.beginPath();
        context.moveTo(-5, -12); 
        context.lineTo(-3, -7);
        context.lineTo(2, -6);
        context.lineTo(-1, -2);
        context.lineTo(0, 5);
        context.lineTo(-5, 0);
        context.lineTo(-10, 5);
        context.lineTo(-9, -2);
        context.lineTo(-12, -6);
        context.lineTo(-7, -7);
        context.closePath();
        context.fill();
        context.restore(); 

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
        context.moveTo(this.x * 18 + (20/2.5), this.y * 2.4 + (33/2.5));
        context.lineTo(this.x * 18 + (24/2.5), this.y * 2.4 + (40/2.5));
        context.lineTo(this.x * 18 + (34/2.5), this.y * 2.4 + (42/2.5));
        context.lineTo(this.x * 18 + (28/2.5), this.y * 2.4 + (50/2.5));
        context.lineTo(this.x * 18 + (30/2.5), this.y * 2.4 + (60/2.5));
        context.lineTo(this.x * 18 + (22/2.5), this.y * 2.4 + (55/2.5));
        context.lineTo(this.x * 18 + (10/2.5), this.y * 2.4 + (60/2.5));
        context.lineTo(this.x * 18 + (12/2.5), this.y * 2.4 + (50/2.5));
        context.lineTo(this.x * 18 + (6/2.5), this.y * 2.4 + (42/2.5));
        context.lineTo(this.x * 18 + (16/2.5), this.y * 2.4 + (40/2.5));
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