import Eggs from './eggs';
import Enemy from './enemy';
import Game from './game';

export default class Wave {
    width: number;
    height: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    enemies: Enemy[];
    game: Game;
    nextWaveTrigger: boolean;

    constructor(game: Game) {
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedX = Math.random() < 0.5 ? -1.5 : 1.5;
        this.speedY = 10;
        this.enemies = [];
        this.nextWaveTrigger =false;
        this.create();
    }
    render(context: CanvasRenderingContext2D) {
        if(this.y < this.height/this.game.rows + this.height/this.game.rows ) this.y += 5;
        this.speedY = 0;
        if (this.x < this.game.player.height * 2 || this.x > this.game.width - this.width - this.game.enemySize * 0.5)  {
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach(enemy => {
            enemy.update(this.x, this.y);
            enemy.draw(context);
        })
        this.enemies = this.enemies.filter(object => !object.markedForDeletion);
    }
    create() {
        for (let y = 0; y < this.game.rows; y++ ) {
            for(let x = 0; x < this.game.columns; x++) {
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                this.enemies.push(new Eggs(this.game, enemyX, enemyY));
            }
        }
    }
    resize() {
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.enemies.forEach(enemy => {
            enemy.spriteWidth = this.game.enemySize;
            enemy.spriteHeight = this.game.enemySize;
        })
    }
}