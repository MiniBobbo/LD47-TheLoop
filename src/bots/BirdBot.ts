import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { GameScene } from '../scene/GameScene';
import { Bot } from './Bot';
import { BotPiece } from './BotPeice';

export class BirdBot extends Bot {
    constructor(gs:GameScene) {
        super(gs);
        
        // this.c.add(shadow);


    }

}