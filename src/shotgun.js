import Tower from './tower.js';

export default class Shotgun extends Tower {
    constructor(options) {
        let bullet = new Image();
        bullet.src = "./images/other/mine_drop.png";
        super(Object.assign(options, {
            towerWidth: 22,
            towerHeight: 34,
            step: 4,
            damage: 5,
            range: 300,
            width: 192,
            height: 32,
            numberOfFrames: 6,
            ticksPerFrame: 0,
            loop: true,
            image: bullet,
            scale: 1,
            cost: 1500
        }))
    }
}