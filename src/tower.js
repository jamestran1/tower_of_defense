import Sprite from './sprite.js';
import {validTowerArea} from './util.js';

let layers = 999;
export default class Tower extends Sprite {
    constructor(options) {
        super(options);
        this.imageTower = options.tower;
        this.targets = [];
        this.originalX = options.x;
        this.originalY = options.y;

        this.towerWidth = options.towerWidth;
        this.towerHeight = options.towerHeight;
        this.range = options.range;
        this.damage = options.damage;
        this.cost = options.cost;
        this.tower_ctx = options.tower_ctx;
        this.monsters = options.monsters;

        window.currentGold -= this.cost;
        this.build();
    }


    build() {
        if (!validTowerArea(this.x, this.y)) return;

        this.tower_ctx.clearRect(0, 0, 700, 700);
        let layer = document.createElement("canvas");
        layer.width = 700;
        layer.height = 700;
        layer.style.setProperty("z-index", `${layers}`);
        layer.style.setProperty("position", "absolute");
        layer.className = "tower";
        container.appendChild(layer);

        let layer_ctx = layer.getContext("2d");    
        layer_ctx.clearRect(0, 0, 700, 700);
        layer_ctx.beginPath();

        layer_ctx.drawImage(this.imageTower, 0, 0, this.towerWidth, this.towerHeight, this.x - 10, this.y - 30, this.towerWidth, this.towerHeight*1);
        layer_ctx.stroke();
        layer_ctx.fill();
        layer_ctx.closePath();    

        let bullet_layer = document.createElement("canvas");
        bullet_layer.width = 700;
        bullet_layer.height = 700;
        bullet_layer.style.setProperty("z-index", `${layers}`);
        bullet_layer.style.setProperty("position", "absolute");

        container.appendChild(bullet_layer);
        this.context = bullet_layer.getContext("2d");
        layers++;
    }

    scan() {
        if (this.targets.length > 0) return;
        this.monsters.forEach((m, i) => {
            let distance = Math.distance(m.x, m.y, this.x, this.y);
            if (distance <= this.range) {
                this.targets.push(m);
            }
        })

    }

    render() {
        if (this.targets.length <= 0) {
            return;
        }
        this.context.clearRect(0, 0, 700, 700);
        let m = this.targets[0];

        let distance = Math.distance(m.x, m.y, this.x, this.y);
        if (distance > this.range) {
            this.targets = [];
            this.x = this.originalX;
            this.y = this.originalY;
            return;
        }
        if (distance > 0 && this.x < m.x) this.x += this.step;
        if (distance > 0 && this.x > m.x) this.x -= this.step;
        if (distance > 0 && this.y < m.y) this.y += this.step;
        if (distance > 0 && this.y > m.y) this.y -= this.step;

        super.render();

        if (distance < 5) {
            m.lives -= this.damage;
            console.log('lives: ', m.lives);
            if (m.lives <= 0) {
                window.currentGold = window.currentGold + window.coin;
                this.targets = [];
            }
            this.x = this.originalX;
            this.y = this.originalY;
            this.context.clearRect(0, 0, 700, 700);
        }
    }
}