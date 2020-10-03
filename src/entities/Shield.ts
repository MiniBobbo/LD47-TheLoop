import Phaser from 'phaser'
import { GameScene } from '../scene/GameScene';
import { Bullet } from './Bullet';

export class Shield {
    s:Phaser.GameObjects.Sprite;
    radius:number = 100;
    gs:GameScene;
    active:boolean = false;
    constructor(gs:GameScene) {
        this.gs = gs;

        this.s = gs.add.sprite(0,0,'atlas', 'shield_0').setDepth(550).setAlpha(.5);
        this.s.setVisible(false);

        this.s.on('shieldon', this.ShieldOn, this);
        this.s.on('shieldoff', this.ShieldOff, this);
        

    }

    emit(event:string) {
        this.s.emit(event);
    }

    ShieldOn() {
        this.s.visible = true;
        this.active= true;
    }

    ShieldOff() {
        this.s.visible = false;
        this.active= false;
    }

    Blocked(b:Bullet):boolean { 
        return false;
    }
        

}