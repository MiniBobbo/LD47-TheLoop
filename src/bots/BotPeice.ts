import Phaser from 'phaser'
import { C } from '../C';
import { Bot } from './Bot';

export class BotPiece {
    health:number = 10;
    invulnerable:boolean = false;
    destructable:boolean = false;
    destroyed:boolean = false;
    passalongDamage:number = 20;
    baseDepth:number = 0;
    armor:number = 0;
    partName:string;

    parentBot:Bot;

    s:Phaser.GameObjects.Sprite;

    constructor(parent:Bot) {
        this.parentBot = parent;
        this.s = this.parentBot.gs.add.sprite(0,0, 'atlas');
        this.parentBot.AddPiece(this);
    }

    PlayAnimation(baseName:string, animationName:string ) {
        let frameName = `${baseName}_${animationName}_${this.partName}`;
        if(this.destroyed)
            frameName += '_destroyed';

        this.s.setFrame(frameName);

        this.s.setDepth(C.BOT_DEPTH + this.baseDepth);
    }

}