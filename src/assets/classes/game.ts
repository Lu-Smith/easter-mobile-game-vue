export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
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
    }
    render(deltaTime: number, playing: boolean) {
        //timer
        console.log(playing);
        if (!this.gameOver && playing) {
            this.timer += deltaTime
        } else {
            return this.timer = 0;
        };
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
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillText('Timer: ' + this.formatTimer(), 10, 20); 
    }
    
    resize(width: number, height: number) {     
        this.canvas.width = width;
        this.canvas.height = height;
        this.gameOver = false;
        this.timer = 0;
    }
}
