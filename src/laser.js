import Tower from './tower.js';

export default class Laser extends Tower {
    constructor(options) {
        let bullet = new Image();
        bullet.src = "./images/other/speedflames.png";
        super(Object.assign(options, {
            towerWidth: 22,
            towerHeight: 35,
            step: 4,
            damage: 3.5,
            range: 150,
            width: 120,
            height: 14,
            numberOfFrames: 6,
            ticksPerFrame: 0,
            loop: true,
            image: bullet,
            scale: 1,
            cost: 250
        }))
    }
}
