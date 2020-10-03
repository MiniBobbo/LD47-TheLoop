import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { GameScene } from '../scene/GameScene';
import { Bot } from './Bot';
import { BotPiece } from './BotPeice';

export class TestBot extends Bot {
    constructor(gs:GameScene) {
        super(gs);
        
        this.baseName = 'Testbot';
        
        let body = new BotPiece(this);
        body.partName = 'Body';
        body.health = 100;
        this.SetMainPiece(body);

        let shields = new BotPiece(this);
        shields.baseDepth = 1;
        shields.partName = 'Shield';
        shields.invulnerable = true;
        
        let guns = new BotPiece(this);
        guns.partName = "Gun";
        guns.armor = 5;
        guns.baseDepth = 2;
        guns.destructable = true;


        this.PlayAnimation('stand');
    }

}