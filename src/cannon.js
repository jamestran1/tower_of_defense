import Tower from './tower.js';

export default class Cannon extends Tower {
    constructor(options) {
        let bullet = new Image();
        bullet.src = "./images/other/bulleta.png";
        super(Object.assign(options, {
            towerWidth: 23,
            towerHeight: 33,
            step: 3.2,
            damage: 1,
            range: 100,
            width: 17,
            height: 17,
            numberOfFrames: 1,
            ticksPerFrame: 0,
            loop: false,
            image: bullet,
            scale: 1.5,
            cost: 50
        }))
    }
};