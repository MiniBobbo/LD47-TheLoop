import Phaser from 'phaser'
import { EffectDef } from '../def/EffectDef';
import { E } from '../E';
import { S } from '../S';
import { GameScene } from '../scene/GameScene'

export class EffectSubsystem {
    gs:GameScene;
    effects:Array<Phaser.GameObjects.Sprite>;
    constructor(gs:GameScene){
        this.gs = gs;

        this.effects = [];

    }

    PlayEffect(def:EffectDef) {
        // return;
        let e = this.GetEffect();
        e.setActive(true).setVisible(true);
        e.setPosition(def.x, def.y);
        e.setAngle(Phaser.Math.Between(-180, 180));
        e.setDepth(101);
        e.setScale(1,1);
        this.gs.time.addEvent({
            delay:2000,
            callbackScope:this.gs,
            callback:() => {e.setActive(false).setVisible(false);}
        });
        switch (def.effect) {
            case E.EXPLODE:
                e.setScale(2);
                e.play(E.EXPLODE);
                this.gs.events.emit('sound', S.EXPLODE);
                break;
            case E.HIT:
                e.setScale(2);
                e.play('effect_hit1');
                this.gs.events.emit('sound', S.HIT);
                break;
            case E.SHIELDED:
                e.setScale(2);
                e.play(E.SHIELDED);
                this.gs.events.emit('sound', S.SHIELDED);
                break;
            case E.BLOCKED:
                e.setScale(1);
                e.play(E.BLOCKED);
                this.gs.events.emit('sound', S.PING);
                break;
            case E.PREPFIRE:
                e.setScale(1);
                e.play(E.PREPFIRE);
                this.gs.events.emit('sound', S.PING);
                break;
            case E.MISSED:
                e.setScale(1);
                e.play(E.MISSED);
                // this.gs.events.emit('sound', S.PING);
                break;
            default:
                e.play(E.BLOCKED);
                break;
        }
    }

    private HideEffect(e:Phaser.GameObjects.Sprite) {
        e.setActive(false).setVisible(false);
    }

    GetEffect():Phaser.GameObjects.Sprite {
        let e:Phaser.GameObjects.Sprite;
        for(let i = 0; i < this.effects.length; i++) {
            if(!this.effects[i].active) {
                e = this.effects[i];
                // console.log('Recycling effect');
                break;
            }            
        }
        if(e == null) {
            e = this.gs.add.sprite(0,0,'atlas');
            this.effects.push(e);
            // console.log('New effect');
        }
        return e;
    }

    Destroy() {
        this.effects = null;
    }


}