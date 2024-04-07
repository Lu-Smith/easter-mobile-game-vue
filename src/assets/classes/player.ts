import Game from './game';

export default class Player {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    spriteWidth: number;
    spriteHeight: number;
    speed: number;
    lives: number;
    maxLives: number;
    image: HTMLImageElement;
    frameX: number;
    // matching types with Projectile
    free: any;
    start: any;
    reset: any;

    constructor(game: Game) {
        this.game =  game;
        this.spriteWidth = 35;
        this.spriteHeight = 35;
        this.x = this.game.width * 0.5;
        this.y = this.game.height - this.spriteHeight * 0.5;
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.speed = 5;
        this.image = document.getElementById('player') as HTMLImageElement;
        this.frameX = 0;
        this.lives = 3;
        this.maxLives = 10;
        // matching types with Projectile
        this.free;
        this.start;
        this.reset;
    }
    draw(context: CanvasRenderingContext2D) {
        if ((this.game.keys.indexOf('1')  > -1) || (this.game.keys.indexOf(' ') > -1) || (this.game.keys.indexOf('Enter') > -1)) {
            this.frameX = 1;
        } else {
            this.frameX = 0;
        }
       context.drawImage(this.image, this.frameX * this.spriteWidth * 2, 0, this.spriteWidth * 2, this.spriteHeight * 2, this.x - this.width, this.game.background.scaledHeight - this.height, this.width * 2, this.height * 2);
        if (this.game.debug) {
        context.strokeStyle = 'white';
        context.lineWidth = 1.5;   
           context.beginPath();
           context.arc(this.x, this.y + this.height * 0.5, this.height, 0, Math.PI * 2);
           context.stroke();
        }
    }
    update() {
        //horizontal movement
        if ((this.game.keys.indexOf('ArrowLeft') > -1 ))   {
            this.x -= this.speed;
        } else if ((this.game.keys.indexOf('ArrowRight') > -1)) {
            this.x += this.speed;
        } 
        if (this.game.left === 1)   {
            this.x -= this.game.left;
        } else if (this.game.right === 1) {
            this.x += this.game.right;
        } 
        //horizontal boundries
        if (this.x < this.game.width * 0.05 + this.height) this.x = this.game.width * 0.05 + this.height;
        else if (this.x > this.game.width - (this.height)) this.x = this.game.width - (this.height);
        else if (this.x > this.game.background.scaledWidth + this.height) this.x = this.game.background.scaledWidth + this.height;
   
    }
    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile) {
            projectile.start(this.x, this.y - this.height * 0.5); 
        }
    } 
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.x = (this.game.width * 0.5) - (this.height * 0.5);
        this.y = this.game.height - (160 * this.game.ratio);
    }
}