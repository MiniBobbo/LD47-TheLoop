import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
    preload() {
        this.load.image('main', 'assets/ss4.png');
        this.load.atlas('atlas', 'assets/atlas.png', 'assets/atlas.json');
        this.load.glsl('blur', 'assets/shadercode/blur.frag');
        this.load.audio('explode', 'assets/sounds/explosion.wav');
        this.load.audio('ping', 'assets/sounds/Blocked.wav');
        this.load.audio('hit', 'assets/sounds/Hit.wav');
        this.load.audio('wind1', 'assets/sounds/wind1.mp3');
        this.load.audio('wind2', 'assets/sounds/wind2.mp3');
        this.load.audio('wind3', 'assets/sounds/wind3.mp3');

    }
    create() {
        this.anims.create({ key: 'effect_prepfire', frameRate:60, frames: this.anims.generateFrameNames('atlas', { prefix: 'prepfire_', end: 23 }), repeat: 0 });
        this.anims.create({ key: 'explode', frameRate:60, frames: this.anims.generateFrameNames('atlas', { prefix: 'explode_', end: 30 }), repeat: 0 });
        this.anims.create({ key: 'effect_hit1', frames: this.anims.generateFrameNames('atlas', { prefix: 'hit_', end: 29 }), repeat: 0 });
        this.anims.create({ key: 'effect_shielded', frames: this.anims.generateFrameNames('atlas', { prefix: 'effect_shielded_', end: 29 }), repeat: 0 });
        this.anims.create({ key: 'effect_blocked1', frames: this.anims.generateFrameNames('atlas', { prefix: 'blocked1_', end: 10 }), repeat: 0 });
        this.anims.create({ key: 'effect_blocked2', frames: this.anims.generateFrameNames('atlas', { prefix: 'blocked2_', end: 12 }), repeat: 0 });
    
        this.scene.start('menu');
    }
}