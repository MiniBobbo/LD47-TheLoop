import Phaser from 'phaser'
import { isThisTypeNode } from 'typescript';
import { C } from '../C';
import { EffectDef } from '../def/EffectDef';
import { PlayerBulletDef } from '../def/PlayerBulletDef';
import { PlayerAttack } from '../entities/PlayerAttack';
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

    currentAnim:string = "";
    currentBase:string = "";

    s:Phaser.GameObjects.Sprite;

    constructor(parent:Bot) {
        this.parentBot = parent;
        this.s = this.parentBot.gs.add.sprite(0,0, 'atlas').setOrigin(0,0);
        this.parentBot.AddPiece(this);
    }

    PlayAnimation(baseName:string, animationName:string ) {
        this.currentAnim = animationName;
        this.currentBase = baseName;
        let frameName = `${baseName}_${animationName}_${this.partName}`;
        if(this.destroyed)
            frameName += '_destroyed';

        this.s.setFrame(frameName);

        this.s.setDepth(C.BOT_DEPTH + this.baseDepth);
    }

    Damage(damage:number) {
        if(this.destructable) {
            this.health -= damage - this.armor;
            if(this.health <=0) {
                this.health = 0;
            }
        }
    }

    Destroyed() {
        this.PlayAnimation(this.currentAnim, this.currentBase);
        let ed = new EffectDef();
        ed.effect = 'destroy';
        this.parentBot.gs.events.emit('effect', );
    }

    /**Checks if this piece was hit by an attack. 
     * Returns true if it was.
     */
    CheckHit(x:number, y:number, bullet:PlayerAttack):boolean {
        if(this.destroyed)
            return false;
        let hit = this.parentBot.gs.textures.getPixelAlpha(x,y,'atlas', this.s.frame.name) > 0;
        if(hit) {
            if(this.invulnerable) {
                this.parentBot.gs.events.emit('sound', 'invulnerable');
                let ed = new EffectDef();
                ed.effect = "invulnerable";
                ed.x = bullet.s.x;
                ed.y = bullet.s.y;
                this.parentBot.gs.events.emit('effect', ed);
            } else {
                this.Damage(bullet.level);
            }
        }
        return hit;
    }
        

}