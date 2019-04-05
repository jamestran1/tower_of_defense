import Tower from './tower.js';

export default class FlamthRower extends Tower {
    constructor(options) {
        let bullet = new Image();
        bullet.src = "./images/other/bullet_onion.png";
        super(Object.assign(options, {
            towerWidth: 32,
            towerHeight: 36,
            step: 3.5,
            damage: 3,
            range: 120,
            width: 168,
            height: 29,
            numberOfFrames: 6,
            ticksPerFrame: 0,
            loop: true,
            image: bullet,
            scale: 1.5,
            cost: 100
        }))
    }
}
