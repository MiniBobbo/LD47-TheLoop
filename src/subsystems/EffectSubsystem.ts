import Phaser from 'phaser'
import { EffectDef } from '../def/EffectDef';
import { GameScene } from '../scene/GameScene'

export class BackgroundSubsystem {
    gs:GameScene;
    effects:Array<Phaser.GameObjects.Sprite>;
    constructor(gs:GameScene){
        this.gs = gs;

        this.effects = [];

    }

    PlayEffect(def:EffectDef) {
        let e = this.GetEffect();
        switch (def.effect) {
       
            default:
                break;
        }
    }

    GetEffect():Phaser.GameObjects.Sprite {
        let e:Phaser.GameObjects.Sprite;
        for(let i = 0; i < this.effects.length; i++) {
            if(!this.effects[i].active) {
                e = this.effects[i];
                console.log('Recycling effect');
                break;
            }            
        }
        if(e == null) {
            e = this.gs.add.sprite(0,0,'atlas');
            this.effects.push(e);
            console.log('New effect');
        }
        return e;
    }


}