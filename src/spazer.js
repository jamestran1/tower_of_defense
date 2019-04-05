import Tower from './tower.js';

export default class Spazer extends Tower {
    constructor(options) {
        let bullet = new Image();
        bullet.src = "./images/other/shockwave.png";
        super(Object.assign(options, {
            towerWidth: 22,
            towerHeight: 30,
            step: 6,
            damage: 9,
            range: 900,
            width: 720,
            height: 80,
            numberOfFrames: 9,
            ticksPerFrame: 0,
            loop: true,
            image: bullet,
            scale: 1,
            cost: 2000
        }))
    }
}