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
    // matching types with Projectile
    free: any;
    start: any;
    reset: any;

    constructor(game: Game) {
        this.game =  game;
        this.x = this.game.width * 0.5;
        this.y = 0;
        this.spriteWidth = 35;
        this.spriteHeight = 35;
        this.width = 0;
        this.height = 0;
        this.speed = 5;
        // matching types with Projectile
        this.free;
        this.start;
        this.reset;
    }
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.x = (this.game.width * 0.5) - (this.height * 0.5);
        this.y = this.game.height - (160 * this.game.ratio);
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
        if (this.x < this.height * 0.5) this.x = this.height * 0.5;
        else if (this.x > this.game.width - (this.height * 0.5)) this.x = this.game.width - (this.height * 0.5);
   
    }
    draw() {
        this.game.context.beginPath();
        this.game.context.arc(this.x, this.y, this.height, 0, Math.PI * 2);
        this.game.context.stroke();
    } 
    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile) {
            projectile.start(this.x, this.y - this.height * 0.5); 
        }
    } 
}