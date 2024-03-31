import Game from './game';

export default class Enemy {
    game: Game; 
    spriteWidth: number;
    spriteHeight: number;
    scaledWidth: number;
    scaledHeight: number;
    collisionRadius: number;
    x: number;
    y: number;
    positionX: number;
    positionY: number;
    markedForDeletion: boolean;

    constructor(game: Game, positionX: number, positionY: number) {
        this.game = game;
        this.spriteWidth = 40;
        this.spriteHeight = 40;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.collisionRadius = this.scaledWidth * 0.35;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
    }
    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.collisionRadius = this.scaledWidth * 0.35;
    }
    draw(context: CanvasRenderingContext2D){
        context.beginPath();
        context.arc(this.game.width * 0.5, 60 - this.collisionRadius, 
            this.collisionRadius, 0, Math.PI * 2);
        context.stroke();
    }
    update(x: number, y: number) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        // check collision enemies - projectiles
            this.resize();
            this.game.projectilesPool.forEach(projectile => {
                if (!projectile.free && this.game.checkCollision(this, projectile)) {
                    this.hit(1);
                    projectile.reset();
                }
            });
            this.markedForDeletion = true;
        // check collision enemies-player
        if (this.game.checkCollision(this, this.game.player)) {
        }
        // lose condition
        if (this.y + this.spriteHeight > this.game.height) {
           
        }
    }
    hit(damage: number) {
    }
}