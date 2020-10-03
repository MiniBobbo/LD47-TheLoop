import Phaser from 'phaser'

export class HUDScene extends Phaser.Scene {
    cockpit:Phaser.GameObjects.Sprite;
    
    create() {
        this.cockpit = this.add.sprite(0,0,'atlas', 'cockpit').setOrigin(0,0);


    }
} 