import Phaser from 'phaser'
import { EffectDef } from '../def/EffectDef';
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
            case 'explode':
                e.setScale(2);
                e.play('explode');
                this.gs.events.emit('sound', 'explode');
                break;
            case 'hit':
                e.setScale(2);
                e.play('effect_hit1');
                break;
            default:
                e.play('effect_blocked1');
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