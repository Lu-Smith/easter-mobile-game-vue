import Background from './background';
import Player from './player';
import Projectiles from './projectiles';
import Wave from "./waves";
import Enemy from './enemy';
import Audio from './audio';

export default class Game {
    canvas: HTMLCanvasElement;
    // context: CanvasRenderingContext2D;
    width: number;
    height: number;
    baseWidth: number;
    baseHeight: number;
    ratio: number;
    ratioWidth: number;
    //player
    player: Player;
    keys: string[];
    //projectiles
    projectilesPool: Projectiles[];
    numbersOfProjectiles: number;
    fired: boolean;
    //enemy
    enemySize: number;
    columns: number;
    rows: number;
    waves: Wave[];
    waveCount: number;
    //background
    background: Background;
    speed: number;
    //game logic
    gameOver: boolean;
    score: number;
    debug: boolean;
    level: number;
    //timer
    timer: number;
    eventTimer: number;
    eventInterval: number;
    eventUpdate: boolean;
    //mobile
    touchStartX: number;
    swipeDistance: number;
    left: number;
    right: number;
    //sound
    sound: Audio;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 800;
        this.baseWidth = 1500;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.ratioWidth = Number((this.width /this.baseWidth).toFixed(2));
        //player
        this.player = new Player(this);
        this.keys = [];
        //enemy
        this.columns = 4;
        this.rows = 2;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.enemySize = 50 * this.ratio;
         //projectiles
         this.projectilesPool = [];        
         this.numbersOfProjectiles = 15;
         this.fired = false;
         this.createProjectiles();
        //background
        this.background = new Background(this);
        this.speed = 0;
        //game logic
        this.gameOver = false;
        this.score = 0;
        this.debug = false;
        this.level = 1;
        //timer
        this.timer = 0;
        this.eventTimer = 0;
        this.eventInterval = 100;
        this.eventUpdate = false;
        //mobile
        this.touchStartX = 0;
        this.swipeDistance = 50;
        this.left = 0;
        this.right = 0;
        //sound
        this.sound = new Audio();

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            const target = e.currentTarget as Window;
            if (target) {
                this.resize(target.innerWidth, target.innerHeight);
            }
        });

        //keybord controls
        window.addEventListener('keydown', e => {
            if ((e.key === '1' || e.key === 'Enter' || e.key === ' ') && !this.fired) this.player.shoot();
            this.fired = true;
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key.toLowerCase() === 'd') this.debug = !this.debug;     
        });

        window.addEventListener('keyup', e => {
            this.fired = false;
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
        })

        //touch controls
        this.canvas.addEventListener('touchstart', e => {
            this.player.shoot();
            this.touchStartX = e.changedTouches[0].pageX;
        });

        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault();
        })
 
        this.canvas.addEventListener('touchend', e => {
            if (!this.gameOver) {
                if (e.changedTouches[0].pageX - this.touchStartX > (this.swipeDistance * 2)) {
                    this.right = 1;
                    this.left = 0;
                } else if (e.changedTouches[0].pageX - this.touchStartX < -(this.swipeDistance * 2)) {
                    this.left = 1;
                    this.right = 0;
                } else if (e.changedTouches[0].pageX - this.touchStartX <= (this.swipeDistance * 2) && e.changedTouches[0].pageX - this.touchStartX  >= -(this.swipeDistance * 2)) {
                    this.player.shoot();
                    this.right = 0;
                    this.left = 0;
                }
            } else {
                this.resize(window.innerWidth, window.innerHeight);
            }
        });
    }
    resize(width: number, height: number) {    
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = Number((this.height / this.baseHeight).toFixed(2));
        this.ratioWidth = Number((this.width / this.baseWidth).toFixed(2));
        this.gameOver = false;
        this.timer = 0;
        this.score = 0;
        this.enemySize = 50 * this.ratio;
        this.background.resize();
        this.speed = 2 * this.ratio;
        this.player.resize();
        this.waves.forEach(wave => {
            wave.resize();
        })
        //enemy
        this.columns = 4;
        this.rows = 2;
        this.waveCount = 1;
        this.level = 1;
        this.waves = [];
        this.newWave();
    }
    render(context: CanvasRenderingContext2D, deltaTime: number, playing: boolean) {
        context.fillStyle = 'white';
        context.lineWidth = 1.5;
        //background
        this.background.draw(context);
        this.background.update();
        this.speed = 2 * this.ratio;
        //player
        this.player.draw(context);
        this.player.update();
        //projectiles
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        //enemy
        this.waves.forEach(wave => {
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
                this.newWave();
                this.waveCount++;
                if (this.waveCount % 10 === 0) {
                    this.level++;
                }
                wave.nextWaveTrigger = true;
                if (this.player.lives < this.player.maxLives) this.player.lives++;
            } 
            else if (this.gameOver) {
                this.waves = [];
            }
        });
        //timer
        if (!this.gameOver && playing) {
            this.timer += deltaTime;
        } 
        this.handlePeriodicEvents(deltaTime);
        //text
        this.drawStatusText(context);
    }
    createProjectiles() {
        for (let i = 0; i < this.numbersOfProjectiles; i++) {
            this.projectilesPool.push(new Projectiles());
        }
    }
    //get free projectile objext from the pool
    getProjectile() {
        for (let i = 0; i < this.projectilesPool.length; i++) {
            if(this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }
    formatTimer() {
        let seconds = Math.floor(this.timer / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    handlePeriodicEvents(deltaTime: number) {
        if (this.eventTimer < this.eventInterval) {
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else {
            this.eventTimer = this.eventTimer % this.eventInterval;
            this.eventUpdate = true;
        }
    }
    checkCollision(a: Enemy, b: Projectiles) {
        return (
            a.x - a.collisionRadius < b.x + b.width &&
            a.x + a.collisionRadius > b.x &&
            a.y < b.y + b.height &&
            a.y + a.collisionRadius > b.y
        ) 
    }
    checkCollisionPlayer(a: Enemy, b: Player) {
        return (
            a.x - a.collisionRadius < b.x + b.spriteWidth &&
            a.x + a.collisionRadius > b.x &&
            a.y < b.y + b.height &&
            a.y + a.collisionRadius > b.y
        ) 
    }
    drawStatusText(context: CanvasRenderingContext2D) {
        context.save();
        context.font = 'bold 12px Roboto';
        context.fillStyle = '#1a1a1a';
        context.fillText('Timer: ' + this.formatTimer(), 38, 20); 
        context.fillStyle = '#1a1a1a';
        context.fillText('Wave: ' + this.waveCount, 105, 20);
        context.fillStyle = '#1a1a1a';
        context.fillText('Score: ' + this.score, 160, 20);
        function drawEgg(x: number, y: number, radiusX: number, radiusY: number) {
            context.beginPath();
            context.moveTo(x, y - radiusY);
            context.bezierCurveTo(
              x + radiusX, y - radiusY,
              x + radiusX, y + radiusY,
              x, y + radiusY
            );
            context.bezierCurveTo(
              x - radiusX, y + radiusY,
              x - radiusX, y - radiusY,
              x, y - radiusY
            );
            context.closePath();
            context.fill();
          }

          function drawEggStroke(x: number, y: number, radiusX: number, radiusY: number) {
            context.beginPath();
            context.moveTo(x, y - radiusY);
            context.bezierCurveTo(
              x + radiusX, y - radiusY,
              x + radiusX, y + radiusY,
              x, y + radiusY
            );
            context.bezierCurveTo(
              x - radiusX, y + radiusY,
              x - radiusX, y - radiusY,
              x, y - radiusY
            );
            context.closePath();
            context.stroke();
          }
        for (let i = 0; i < this.player.maxLives; i++) {
            if ( this.player.lives <= 2) {
                context.strokeStyle = '#f1b963';
            } else if ( this.player.lives > this.player.maxLives - 2) {
                context.fillStyle = '#118a7e';
            } else {
                context.strokeStyle = '#efe296';
            }
            context.shadowOffsetX = 0.6;
            context.shadowOffsetY = 0.6;
            context.shadowColor = 'black';
            drawEggStroke(this.width - 15 - 16 * i, 16, 8, 9);
        }
        for (let i = 0; i < this.player.lives; i++) {
            if ( this.player.lives <= 2) {
                context.fillStyle = '#ff7e67';
            } else if ( this.player.lives > this.player.maxLives - 2) {
                context.fillStyle = '#118a7e';
            } else {
                context.fillStyle = '#efe296';
            }
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor ='none';
            drawEgg(this.width - 15 - 16 * i, 16, 8, 9);
        }
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '50px Impact';
            context.fillStyle = 'white';
            context.fillText('Game Over!', this.width * 0.5, this.height * 0.4);
            context.font = '15px Impact';
            context.fillText('Your score: ' + this.score + ' - Level: ' + this.level, this.width * 0.5, this.height * 0.52);
        }
        context.restore();
       
    }
    newWave() {
        if(Math.random() < 0.6 && this.columns * this.enemySize < this.width * 0.9 && this.width >= 800) {
            this.columns++;
        } else if (Math.random() < 0.6 && this.columns * this.enemySize < this.width * 0.6 && this.width < 800) {
            this.columns++;
        } else if (this.rows * this.enemySize < this.height * 0.5) {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }
}
