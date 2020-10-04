import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { GameScene } from '../scene/GameScene';
import { Bot } from './Bot';
import { BotPiece } from './BotPeice';

export class TestBot extends Bot {
    sway:number = 0;
    constructor(gs:GameScene) {
        super(gs);
        
        this.baseName = 'sphere';


        this.maxHealth = 5;
        this.currentHealth = 5;
        let body = new BotPiece(this);
        body.partName = 'Body';
        body.health = 150;
        body.armor = 5;
        this.SetMainPiece(body);

        for(let i = 1; i < 5; i++) {
            let s = new BotPiece(this);
            s.partName = `s${i}`;
            s.health = 40;
            s.armor = 0;
            s.destructable = true;
            s.invulnerable = false;
            s.passalongDamage = 30;
        }
        this.PlayAnimation('stand');

        this.position.set(100,50);
        this.Update(0,0);
        
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

    }

}