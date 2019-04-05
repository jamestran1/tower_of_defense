import Slime from './monster.js';
import {validTowerArea} from './util.js';
import Cannon from './cannon.js';
import FlamthRower from './flamthrower.js';
import Laser from './laser.js';
import Matter from './matter.js';
import Rocket from './rocket.js';
import Shotgun from './shotgun.js';
import Spazer from './spazer.js';

let container = document.getElementById("container");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let towers = document.getElementsByClassName("towers");

let monster = new Image();
monster.src = "./images/monster/slime1_front.png";

let tower = new Image();
tower.src = '';
let currentTower = '';

window.currentGold = 200;
window.currentLives = 20;
window.currentRound = 1;
window.coin = 1;
window.ROUND = 20; 

for (let i = 0; i < towers.length; i++) {
    towers[i].onclick = (e) => {
        let remain = 0;
        switch (towers[i].id) {
            case 'cannon':
                remain = currentGold - 50;
                break;
            case 'flamthrower':
                remain = currentGold - 100;
                break;
            case 'laser':
                remain = currentGold - 250;
                break;
            case 'matter':
                remain = currentGold - 500;
                break;
            case 'rocket':
                remain = currentGold - 900;
                break;
            case 'shotgun':
                remain = currentGold - 1500;
                break;
            case 'spazer':
                remain = currentGold - 2000;
                break;
            default:
                break;
        }
        if (remain < 0) {
            alert("You're very poor! Work hard and earn more!");
            return;
        }
        tower.src = `./images/towers/${towers[i].id}/1_down.png`;
        currentTower = towers[i].id;
    }
}


let monsters = [];
function createSlimes(n, lives, scale) {
    let i = 0;

    let myInterval = setInterval(() => {
        if (i < n) {
            let canvas1 = document.createElement("canvas");
            canvas1.width = 700;
            canvas1.height = 700;
            canvas1.style.setProperty("z-index", `${i + 1}`);
            canvas1.style.setProperty("position", "absolute");
            container.appendChild(canvas1);
            let slime = new Slime({
                canvas: canvas1,
                context: canvas1.getContext("2d"),
                width: 64,
                height: 16,
                image: monster,
                y: Math.random() * (455 - 448) + 448,
                x: Math.random() * 5,
                numberOfFrames: 4,
                ticksPerFrame: 0,
                loop: true,
                step: 2,
                lives: lives,
                scale: scale
            });
            monsters.push(slime);
            i++;
        }
        else {
            clearInterval(myInterval);
        }
    }, 1000);
}

monster.onload = () => {
    let n = 10;
    createSlimes(n, 1, 1);

    let count = 0;
    var id;
    function loop() {
        for (let i = 0; i < monsters.length; i++) {
            monsters[i].update();
            monsters[i].render();
            monsters[i].destroy();
            if (monsters[i].isAlive == false && monsters[i].frameIndex == monsters[i].numberOfFrames - 1) {
                container.removeChild(monsters[i].canvas);
                var m = monsters[i];
                delete monsters[i].canvas;
                delete monsters[i].context;
                delete monsters[i].image;
                monsters[i] = {};
                let index = monsters.indexOf(monsters[i]);
                monsters.splice(index, 1);
                count++;
            }
        }
        if (count == n) {
            count = 0;
            coin += 1;
            currentGold += 150;
            createSlimes(n,++currentRound * 2, 1 + currentRound/100);
        }
        if (currentRound >  ROUND || loose) {
            for(let i = 1; i <= id; i++) {
                cancelAnimationFrame(i);
            }
            return;
        }
        id = requestAnimationFrame(loop); 
       
    }
    id = requestAnimationFrame(loop);
}

let tower_layer = document.createElement("canvas");
tower_layer.width = 700;
tower_layer.height = 700;
tower_layer.style.setProperty("z-index", "99999");
tower_layer.style.setProperty("position", "absolute");
tower_layer.style.setProperty("cursor", "url('./images/cursors/1crosshair2.png'), auto");
container.appendChild(tower_layer);
let tower_ctx = tower_layer.getContext("2d");

tower_layer.onmousemove = (e) => {
    if (tower.src == `${window.location.href}`) {
        return
    };
    let range;
    switch (currentTower) {
        case 'cannon':
            range = 100;
            break;
        case 'flamthrower':
            range = 120;
            break;
        case 'laser':
            range = 150;
            break;
        case 'matter':
            range = 60;
            break;
        case 'rocket':
            range = 200;
            break;
        case 'shotgun':
            range = 300;
            break;
        case 'spazer':
            range = 900;
            break;
        default:
            break;
    }
    
    tower_ctx.clearRect(0, 0, 700, 700);
    tower_ctx.beginPath();

    if (validTowerArea(e.offsetX, e.offsetY)) {
        tower_ctx.fillStyle = 'rgba(0,255,0, .4)';
    } else {
        tower_ctx.fillStyle = 'rgba(255,0,0, .4)';
    }

    tower_ctx.drawImage(tower, 0, 0, 23, 33, e.offsetX - 10, e.offsetY - 30, 23 * 1, 33 * 1);
    tower_ctx.arc(e.offsetX, e.offsetY, range, 0, Math.PI * 2);

    tower_ctx.fill();
    tower_ctx.closePath();
}

tower_layer.onmouseup = (e) => {
    let t;
    let options = {
        x: e.offsetX,
        y: e.offsetY,
        tower: tower,
        tower_ctx: tower_ctx,
        monsters: monsters
    }
    switch (currentTower) {
        case 'cannon':
            t = new Cannon(options);
            break;
        case 'flamthrower':
            t = new FlamthRower(options);
            break;
        case 'laser':
            t = new Laser(options);
            break;
        case 'matter':
            t = new Matter(options);
            break;
        case 'rocket':
            t = new Rocket(options);
            break;
        case 'shotgun':
            t = new Shotgun(options);
            break;
        case 'spazer':
            t = new Spazer(options);
            break;
        default:
            break;
    }
    tower.src = '';
    currentTower = '';
    function loop() {
        t.scan();
        t.render();
        t.update();

        if (window.currentRound >  window.ROUND || loose) {
            for(let i = 1; i <= id; i++) {
                cancelAnimationFrame(i);
            }

            let canvas_towers = document.getElementsByClassName("tower");
            for(let i = 1; i <= canvas_towers.length; i++) {
                container.removeChild(canvas_towers[i]);
            }
            container.removeChild(canvas_towers);
            return;
        }
        requestAnimationFrame(loop);
    }

    loop();
    
}

let loose = false;
let totalId;
function StartGame() {
    ctx.font = "24px Helvetica";
    ctx.fillStyle = '#fff';
    function loop() {
        ctx.clearRect(0, 0, 700, 700);
        ctx.beginPath();
        
        if(window.currentLives == 0) {
            ctx.font = "50px Helvetica";
            ctx.fillText("You Loose", 250,350, 300);
            loose = true;
            for (let i = 0; i < totalId; i++){
                cancelAnimationFrame(totalId);
            }
            return;
        }
        if (window.currentLives > 0 && window.currentRound > ROUND) {
            ctx.font = "50px Helvetica";
            ctx.fillText("You Win", 250,350, 300);
            for (let i = 0; i < totalId; i++){
                cancelAnimationFrame(totalId);
            }
            return;
        }

        ctx.fillText(`Lives: ${window.currentLives}`, 10, 50);
        ctx.fillText(`Gold: ${window.currentGold}`, 300, 50);
        ctx.fillText(`Round: ${window.currentRound}/${ROUND}`, 550, 50);
        ctx.closePath();
        totalId = requestAnimationFrame(loop);
    }

    loop();
}
 StartGame();