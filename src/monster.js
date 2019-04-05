import Sprite from './sprite.js';
import { validTowerArea} from './util.js';
import path from './path.js';

export default class Slime extends Sprite {
    constructor(options) {
        super(options);
        this.reverse = false;
        this.corner = 1;
        this.lives = options.lives;
        this.interval = options.interval;
        this.randomX = Math.floor(Math.random() * 20 - 10);
        this.randomY = Math.floor(Math.random() * 20 - 10);
        this.isAlive = true;

        this.image = new Image();
        this.image.src = "./images/monster/slime1_front.png";
    }

    destroy() {
        if (this.isAlive == false && this.frameIndex == this.numberOfFrames - 1) {
            this.context.clearRect(0, 0, 700, 700);
            this.x = -9999;
            this.y = -9999;
        }
    }
    render() {
        this.context.clearRect(this.x, this.y, this.scale * this.width, this.scale * this.height);
        if (this.lives <= 0 && this.isAlive == true) {
            this.image = new Image();
            this.image.src = "./images/monster/slime_explode.png";
            this.width = 296;
            this.height = 41;
            this.numberOfFrames = 8;
            this.loop = false;
            this.isAlive = false;
        } else if(this.lives > 0) {
            let xArea = path[this.corner].x + this.randomX;
            let yArea = path[this.corner].y + this.randomY;

            let distance = Math.distance(xArea, yArea, this.x, this.y);
            if (distance > 0 && this.x < xArea) this.x += this.step;
            if (distance > 0 && this.x > xArea) this.x -= this.step;
            if (distance > 0 && this.y < yArea) this.y += this.step;
            if (distance > 0 && this.y > yArea) this.y -= this.step;

            if (distance < 5) this.reverse ? this.corner-- : this.corner++;

            if (this.corner > 5 && distance < 5 && this.loop == true) {
                window.currentLives--;
                this.isAlive = false;
                this.lives = 0;
                this.frameIndex = 7;
            } 
        }
        super.render();
    }
}