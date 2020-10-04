import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { GameScene } from '../scene/GameScene';
import { Bot } from './Bot';
import { BotPiece } from './BotPeice';

export class TestBot extends Bot {
    constructor(gs:GameScene) {
        super(gs);
        
        this.c.setPosition(100,0);

        this.baseName = 'sphere';
        
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
    }


}