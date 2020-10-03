import Phaser from 'phaser'
import { isThisTypeNode } from 'typescript';
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
        this.s = this.parentBot.gs.add.sprite(0,0, 'atlas').setOrigin(0,0);
        this.parentBot.AddPiece(this);
    }

    PlayAnimation(baseName:string, animationName:string ) {
        let frameName = `${baseName}_${animationName}_${this.partName}`;
        if(this.destroyed)
            frameName += '_destroyed';

        this.s.setFrame(frameName);

        this.s.setDepth(C.BOT_DEPTH + this.baseDepth);
    }

    /**Checks if this piece was hit by an attack. 
     * Returns true if it was.
     */
    CheckHit(x:number, y:number):boolean {
        let hit = this.parentBot.gs.textures.getPixelAlpha(x,y,'atlas', this.s.frame.name) > 0;
        if(hit) {
            console.log(`Bullet hit ${this.partName}`);
        }
        return hit;
    }
        

}