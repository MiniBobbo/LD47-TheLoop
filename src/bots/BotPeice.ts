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

        let frameName = '';
        if(this.destroyed)
            frameName = `${baseName}_${animationName}_destroyed_${this.partName}`;
        else
            frameName = `${baseName}_${animationName}_${this.partName}`;
        this.s.setFrame(frameName);

        this.s.setDepth(C.BOT_DEPTH + this.baseDepth);
    }

    Damage(bullet:PlayerAttack) {
        let damage = bullet.GetBulletDamage() - this.armor;
        if(this.invulnerable ||  damage <= 0) {
            this.parentBot.gs.events.emit('sound', 'invulnerable');
            let ed = new EffectDef();
            ed.effect = "invulnerable";
            ed.x = bullet.s.x;
            ed.y = bullet.s.y;
            this.parentBot.gs.events.emit('effect', ed);
        } else if(this.destructable) {
            this.health -= damage;
            this.parentBot.gs.FlashFast(this.s);
            if(this.health <=0) {
                this.health = 0;
                this.Destroyed();
                this.parentBot.Damage(this.passalongDamage);
            } 
        }  else {
            this.parentBot.Damage(damage);
        }
    }

    Destroyed() {
        this.destroyed = true;
        this.PlayAnimation(this.currentBase, this.currentAnim);
        let ed = new EffectDef();
        ed.effect = 'destroy';
        this.parentBot.gs.events.emit('effect', ed);
    }

    /**Checks if this piece was hit by an attack. 
     * Returns true if it was.
     */
    CheckHit(x:number, y:number, bullet:PlayerAttack):boolean {
        if(this.destroyed)
            return false;
        let hit = this.parentBot.gs.textures.getPixelAlpha(x,y,'atlas', this.s.frame.name) > 0;
        if(hit) {
            this.Damage(bullet);
        }
        return hit;
    }
        

}