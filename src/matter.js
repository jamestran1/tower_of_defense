import Tower from './tower.js';

export default class Matter extends Tower {
    constructor(options) {
        let bullet = new Image();
        bullet.src = "./images/other/bullet_tomato.png";
        super(Object.assign(options, {
            towerWidth: 24,
            towerHeight: 37,
            step: 2.6,
            damage: 7,
            range: 60,
            width: 132,
            height: 22,
            numberOfFrames: 5,
            ticksPerFrame: 0,
            loop: true,
            image: bullet,
            scale: 1,
            cost: 500
        }))
    }
}