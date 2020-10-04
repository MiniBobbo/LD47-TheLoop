import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { SphereFire } from '../FSM/spherefsm/SphereFire';
import { SphereWait } from '../FSM/spherefsm/SphereWait';
import { GameScene } from '../scene/GameScene';
import { Bot } from './Bot';
import { BotPiece } from './BotPeice';
import { SphereGun } from './spherebot/SphereGun';

export class TestBot extends Bot {
    sway:number = 0;
    spheres:Array<BotPiece>;
    constructor(gs:GameScene) {
        super(gs);
        
        this.baseName = 'sphere';

        this.spheres = [];
        this.maxHealth = 120;
        this.currentHealth = 120;
        let body = new BotPiece(this);
        body.partName = 'Body';
        body.health = 150;
        body.armor = 10;
        this.SetMainPiece(body);

        for(let i = 1; i < 5; i++) {
            let s = new SphereGun(this, i);
            this.spheres.push(s);
        }
        this.PlayAnimation('stand');

        this.position.set(75,25);
        this.Update(0,0);

        this.fsm.addModule('wait', new SphereWait(this));
        this.fsm.addModule('fire', new SphereFire(this));
    }

    Update(time:number, dt:number) {
        super.Update(time, dt);
        this.pieces.forEach(element => {
            element.offset.y = this.sway;
        });

    }

    BotStart() {
        super.BotStart();
        this.gs.tweens.add({
            targets:this,
            sway:20,
            yoyo:true,
            repeat:-1,
            duration:1000,
            ease: Phaser.Math.Easing.Sine.InOut

        }); 
        this.fsm.changeModule('wait');

    }

    Destroy(){
        this.spheres = [];
        super.Destroy();
    }

}