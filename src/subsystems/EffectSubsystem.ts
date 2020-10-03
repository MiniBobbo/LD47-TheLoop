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
        return;
        let e = this.GetEffect();
        e.setActive(true).setVisible(true);
        switch (def.effect) {
       
            default:
                e.setPosition(def.x, def.y);
                e.setDepth(101);
                e.play('effect_blocked1');
                // this.gs.time.addEvent({
                //     delay:2000,
                //     callbackScope:this.gs,
                //     callback:this.HideEffect
                // });
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