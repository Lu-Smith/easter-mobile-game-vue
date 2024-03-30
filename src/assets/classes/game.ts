import Background from './background';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    baseWidth: number;
    baseHeight: number;
    ratio: number;
    ratioWidth: number;
    //background
    background: Background;
    //game logic
    gameOver: false;
    //timer
    timer: number;
    eventTimer: number;
    eventInterval: number;
    eventUpdate: boolean;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 800;
        this.baseWidth = 1500;
        this.ratio = Number((this.height /this.baseHeight).toFixed(2));
        this.ratioWidth = Number((this.width /this.baseWidth).toFixed(2));
        //background
        this.background = new Background(this);
        //game logic
        this.gameOver = false;
        //timer
        this.timer = 0;
        this.eventTimer = 0;
        this.eventInterval = 100;
        this.eventUpdate = false;

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
            if (e.key.toLowerCase() === 'r') this.resize(window.innerWidth, window.innerHeight);  
        });

         //touch controls
        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault();
         })
 
         this.canvas.addEventListener('touchend', () => {
            this.resize(window.innerWidth, window.innerHeight);
         });
    }
    resize(width: number, height: number) {     
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = Number((this.height / this.baseHeight).toFixed(2));
        this.ratioWidth = Number((this.width / this.baseWidth).toFixed(2));
        this.background.resize();
        this.gameOver = false;
        this.timer = 0;
        this.background.resize();

        //draw
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'black';
    }
    render(deltaTime: number, playing: boolean) {
        //background
        this.background.draw();
        //timer
        if (!this.gameOver && playing) {
            this.timer += deltaTime;
        } 
        this.handlePeriodicEvents(deltaTime);
        //text
        this.drawStatusText();
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
    drawStatusText() {
        this.context.strokeStyle = 'red';
        this.context.strokeRect(this.canvas.width * 0.05, 35, this.canvas.width * 0.9, this.canvas.height * 0.8);
        this.context.fillStyle = 'black';
        this.context.fillText('Timer: ' + this.formatTimer(), 10, 20); 
       
    }
}
