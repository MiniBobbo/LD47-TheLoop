import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
    preload() {
        this.load.image('main', 'assets/ss4.png');
        this.load.atlas('atlas', 'assets/atlas.png', 'assets/atlas.json');
        this.load.glsl('blur', 'assets/shadercode/blur.frag');

    }
    create() {
        this.scene.start('game');
    }
}