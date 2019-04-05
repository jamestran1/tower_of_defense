'use strict';

export default class Sprite {
    constructor(options) {
        this.frameIndex = 0,
            this.tickCount = 0,
            this.ticksPerFrame = options.ticksPerFrame || 0,
            this.numberOfFrames = options.numberOfFrames || 1;
        this.loop = options.loop;
        this.context = options.context;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.x = options.x;
        this.y = options.y;
        this.sy = 0;
        this.step = options.step;
        this.canvas = options.canvas;
        this.scale = options.scale || 1;
    }

    render() {
        this.context.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            this.sy,
            this.width / this.numberOfFrames,
            this.height,
            this.x,
            this.y,
            this.scale * this.width / this.numberOfFrames,
            this.scale * this.height
        );
    }

    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;

            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else if (this.loop) {
                this.frameIndex = 0;
            }
        }
    }
}