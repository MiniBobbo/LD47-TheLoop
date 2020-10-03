import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { GameScene } from '../scene/GameScene';

export class Bot {
    c:Phaser.GameObjects.Container;
    gs:GameScene;
    constructor(gs:GameScene) {
        this.gs = gs;
        let s = gs.add.sprite(0,0,'atlas', 'birdbot2');
        this.c = gs.add.container(450,200).setDepth(50);
        this.c.add(s);

        gs.tweens.add({
            targets:this.c,
            ease: 'Sine.easeInOut',
            y:210,
            duration: 600,
            repeat: -1,
            yoyo: true,
        });
        

        let shadow = gs.add.image(0,0, 'atlas', 'bot1_shadow_0').setPosition(420,300).setDepth(40).setAlpha(.5);
        // this.c.add(shadow);


    }

}