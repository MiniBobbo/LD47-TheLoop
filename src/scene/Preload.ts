import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
    preload() {
        this.load.image('main', 'assets/ss4.png');
        this.load.atlas('atlas', 'assets/atlas.png', 'assets/atlas.json');
        this.load.glsl('blur', 'assets/shadercode/blur.frag');
        this.load.audio('explode', 'assets/sounds/explosion.wav');

    }
    create() {
        this.anims.create({ key: 'explode', frameRate:60, frames: this.anims.generateFrameNames('atlas', { prefix: 'explode_', end: 30 }), repeat: 0 });
        this.anims.create({ key: 'effect_hit1', frames: this.anims.generateFrameNames('atlas', { prefix: 'hit_', end: 29 }), repeat: 0 });
        this.anims.create({ key: 'effect_blocked1', frames: this.anims.generateFrameNames('atlas', { prefix: 'blocked1_', end: 10 }), repeat: 0 });
        this.anims.create({ key: 'effect_blocked2', frames: this.anims.generateFrameNames('atlas', { prefix: 'blocked2_', end: 12 }), repeat: 0 });
    
        this.scene.start('game');
    }
}