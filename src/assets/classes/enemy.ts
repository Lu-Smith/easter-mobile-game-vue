import Game from './game';
import Eggs from './eggs';

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
        if (this instanceof Eggs) {
            if (this.game.waveCount % 2 === 0 && this.game.waveCount % 3 !== 0) {
                context.drawImage(this.image, this.frameX * this.spriteWidth , this.frameY1 * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
            } else if (this.game.waveCount % 2 !== 0 && this.game.waveCount % 3 === 0 && this.game.waveCount % 5 !== 0) {
                context.drawImage(this.image, this.frameX * this.spriteWidth , this.frameY2 * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
            } else if (this.game.waveCount % 2 !== 0 && this.game.waveCount % 5 === 0) {
                context.drawImage(this.image, this.frameX * this.spriteWidth , this.frameY3 * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
            } else {
                context.drawImage(this.image, this.frameX * this.spriteWidth , this.frameY4 * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
            }
        }
        context.beginPath();
        context.arc(this.game.width * 0.5, 60 - this.collisionRadius, 
            this.collisionRadius, 0, Math.PI * 2);
        context.stroke();
    }
    update(x: number, y: number) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        // check collision enemies - projectiles
        if (this instanceof Eggs) {
            this.resize();
            this.game.projectilesPool.forEach(projectile => {
                if (!projectile.free && this.game.checkCollision(this, projectile) && this.lives > 0) {
                    this.hit(1);
                    projectile.reset();
                }
            });
            if (this.lives < 1) {
                this.frameX++;
                if (this.frameX > this.maxFrame) {
                    this.markedForDeletion = true;
                    if (!this.game.gameOver) this.game.score += this.maxLives;
                }
            }
        }
        // check collision enemies-player
        if (this instanceof Eggs) {
            if (this.game.checkCollision(this, this.game.player) && this.lives > 0) {
                this.lives = 0;
                this.game.player.lives--;
            }
        }
        // lose condition
        if (this.y + this.spriteHeight > this.game.height || this.game.player.lives < 1) {
            // this.game.gameOver = true;
        }
    }
    hit(damage: number) {
        if (this instanceof Eggs) {
            this.lives -= damage;
        }
    }
}