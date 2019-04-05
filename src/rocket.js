import Tower from './tower.js';

export default class Rocket extends Tower {
    constructor(options) {
        let bullet = new Image();
        bullet.src = "./images/other/burning.png";
        super(Object.assign(options, {
            towerWidth: 23,
            towerHeight: 37,
            step: 5,
            damage: 4,
            range: 200,
            width: 64,
            height: 13,
            numberOfFrames: 4,
            ticksPerFrame: 0,
            loop: true,
            image: bullet,
            scale: 1.2,
            cost: 900
        }))
    }
}