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
        this.spriteWidth = 70;
        this.spriteHeight = 68;
        if (this.game.width < 800) {
            this.scaledWidth = this.spriteWidth * this.game.ratio * 0.75;
            this.scaledHeight = this.spriteHeight * this.game.ratio * 0.75;
            this.collisionRadius = this.scaledWidth * 0.5 * 0.75;
        } else {
            this.scaledWidth = this.spriteWidth * this.game.ratio;
            this.scaledHeight = this.spriteHeight * this.game.ratio;
            this.collisionRadius = this.scaledWidth * 0.5;
        }
        this.collisionRadius = this.scaledWidth * 0.35;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
    }
    draw(context: CanvasRenderingContext2D){
        if (this instanceof Eggs) {
            if (this.game.waveCount % 2 === 0 && this.game.waveCount % 3 !== 0) {
                context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY1 * this.spriteHeight, this.spriteWidth * 0.75, this.spriteHeight * 0.75, this.x - this.collisionRadius, this.y - this.collisionRadius * 2, this.scaledWidth * 0.75, this.scaledHeight * 0.75);
            } else if (this.game.waveCount % 2 !== 0 && this.game.waveCount % 3 === 0 && this.game.waveCount % 5 !== 0) {
                context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY2 * this.spriteHeight, this.spriteWidth * 0.75, this.spriteHeight * 0.75, this.x - this.collisionRadius, this.y - this.collisionRadius * 2, this.scaledWidth * 0.75, this.scaledHeight * 0.75);
            } else if (this.game.waveCount % 2 !== 0 && this.game.waveCount % 5 === 0) {
                context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY3 * this.spriteHeight, this.spriteWidth * 0.75, this.spriteHeight * 0.75, this.x - this.collisionRadius, this.y - this.collisionRadius * 2, this.scaledWidth * 0.75, this.scaledHeight * 0.75);
            } else {
                context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY4 * this.spriteHeight, this.spriteWidth * 0.75, this.spriteHeight * 0.75, this.x - this.collisionRadius, this.y - this.collisionRadius * 2, this.scaledWidth * 0.75, this.scaledHeight * 0.75);
            }
        }
        if (this.game.debug) {
            context.beginPath();
            context.arc(this.x, this.y - this.collisionRadius, 
                this.collisionRadius, 0, Math.PI * 2);
            context.stroke();
        }
    }
    update(x: number, y: number) {
        if (this.game.width < 800) {
            this.x = (x + this.positionX) * 0.75;
            this.y = (y + this.positionY) * 0.75;
        } else {
            this.x = x + this.positionX;
            this.y = y + this.positionY;
        }

        //check collision enemies - projectiles
        if (this instanceof Eggs) {
            this.resize();
            this.game.projectilesPool.forEach(projectile => {
                if (!projectile.free && this.game.checkCollision(this, projectile) && this.lives > 0) {
                    Math.random() < this.game.level * 0.1 ? this.hit(1) : this.hit(2);
                    projectile.reset();
                }
            });
            if (this.lives < 2 && this.lives > 1) {
                if (this.game.eventUpdate) this.frameX += 0.75;
            }
            if (this.lives < 1) {
                if (this.game.eventUpdate) this.frameX += 0.75;
                if (this.frameX > this.maxFrame) {
                    this.markedForDeletion = true;
                    if (!this.game.gameOver) this.game.score += 1;
                }
            }
        }
        //check collision enemies-player
        if (this instanceof Eggs) {
            if (this.game.checkCollisionPlayer(this, this.game.player) && this.lives > 0) {
                this.lives = 0;
                this.game.player.lives--;
            }
        }
        // lose condition
        if (this.y + this.spriteHeight > this.game.height || this.game.player.lives < 1) {
            this.game.gameOver = true;
            this.game.sound.play(this.game.sound.lose);
        }
    }
    resize() {
        if (this.game.width < 800) {
            this.scaledWidth = this.spriteWidth * this.game.ratio * 0.75;
            this.scaledHeight = this.spriteHeight * this.game.ratio * 0.75;
            this.collisionRadius = this.scaledWidth * 0.5 * 0.75;
            this.x = this.x * 0.75;
            this.y = this.y * 0.75;
        } else {
            this.scaledWidth = this.spriteWidth * this.game.ratio;
            this.scaledHeight = this.spriteHeight * this.game.ratio;
            this.collisionRadius = this.scaledWidth * 0.5;
        }
    }
    hit(damage: number) {
        if (this instanceof Eggs) {
            this.lives -= damage;
            if (this.lives === 1) {
                this.game.sound.play(this.game.sound.crack);
            } else {
                this.game.sound.play(this.game.sound.die);
            }
        }
    }
}