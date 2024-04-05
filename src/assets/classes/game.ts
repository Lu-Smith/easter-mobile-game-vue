import Background from './background';
import Player from './player';
import Projectiles from './projectiles';
import Wave from "./waves";
import Enemy from './enemy';

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
    //game logic
    gameOver: boolean;
    score: number;
    debug: boolean;
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
        this.columns = 2;
        this.rows = 1;
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
        //game logic
        this.gameOver = false;
        this.score = 0;
        this.debug = false;
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

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            const target = e.currentTarget as Window;
            if (target) {
                this.resize(target.innerWidth, target.innerHeight);
            }
        });

         //mouse controls      
         this.canvas.addEventListener('mousedown', () => {;
            if (this.gameOver) this.resize(window.innerWidth, window.innerHeight);
        });  

        //keybord controls
        window.addEventListener('keydown', e => {
            if ((e.key === '1' || e.key === 'Enter' || e.key === ' ') && !this.fired) this.player.shoot();
            this.fired = true;
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key.toLowerCase() === 'd') this.debug = !this.debug;     
            if (e.key.toLowerCase() === 'r') this.resize(window.innerWidth, window.innerHeight);  
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
        this.player.resize();
        this.waves.forEach(wave => {
            wave.resize();
        })
        //enemy
        this.columns = 2;
        this.rows = 1;
        this.waveCount = 1;
        this.waves = [];
        this.newWave();
    }
    render(context: CanvasRenderingContext2D, deltaTime: number, playing: boolean) {
        console.log('yes');
        //background
        this.background.draw(context);
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
        return (this.timer * 0.001).toFixed(0);
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
            a.x < b.x + b.width &&
            a.x + a.spriteWidth > b.x &&
            a.y < b.y + b.height &&
            a.y + a.spriteHeight > b.y
        ) 
    }
    drawStatusText(context: CanvasRenderingContext2D) {
        context.save();
        context.strokeStyle = 'orange';
        context.strokeRect(this.canvas.width * 0.05, 35, this.canvas.width * 0.9, this.canvas.height * 0.8);
        context.fillStyle = 'black';
        context.fillText('Timer: ' + this.formatTimer(), 20, 20); 
        context.fillStyle = 'red';
        context.fillText('Score: ' + this.score, 88, 20);
        context.fillStyle = 'black';
        context.fillText('Wave: ' + this.waveCount, 160, 20);
        context.lineWidth = 1.5;
        for (let i = 0; i < this.player.maxLives; i++) {
            if ( this.player.lives < 2) {
                context.strokeStyle = '#f1b963';
            } else {
                context.strokeStyle = '#3baea0';
            }
            context.shadowOffsetX = 0.6;
            context.shadowOffsetY = 0.6;
            context.shadowColor = 'black';
            context.strokeRect(this.width - 30 - 15 * i, 8, 9, 15)
        }
        for (let i = 0; i < this.player.lives; i++) {
            if ( this.player.lives < 2) {
                context.fillStyle = '#ff7e67';
            } else {
              context.fillStyle = '#118a7e';
            }
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor ='none';
            context.fillRect(this.width - 30 - 15 * i, 8, 9, 15);
        }
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '50px Impact';
            context.fillText('Game Over!', this.width * 0.5, this.height * 0.5);
            context.font = '15px Ariel';
            context.fillText('Press "R" ot tap to play again.', this.width * 0.5, this.height * 0.54);
        }
        context.restore();
       
    }
    newWave() {
        if(Math.random() < 0.6 && this.columns * this.enemySize < this.width * 0.9) {
            this.columns++;
        } else if (this.rows * this.enemySize < this.height * 0.6) {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }
}
