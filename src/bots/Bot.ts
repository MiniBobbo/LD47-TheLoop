import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { Bullet } from '../entities/Bullet';
import { GameScene } from '../scene/GameScene';
import { BotPiece } from './BotPeice';

export class Bot {
    c:Phaser.GameObjects.Container;
    gs:GameScene;
    baseName:string;
    private basePiece:BotPiece;
    private pieces:Array<BotPiece>;
    constructor(gs:GameScene) {
        this.gs = gs;
        this.c = gs.add.container(450,200).setDepth(50);

        this.pieces = [];

        // this.gs.events.on('bot_check_hit', this.CheckHit, this);
    }

    AddPiece(piece:BotPiece) {
        this.pieces.push(piece);
        this.c.add(piece.s);
    }

    SetMainPiece(piece:BotPiece) {
        this.basePiece = piece;
        this.CreateListeners();
    }

    private CreateListeners() {

    }

    PlayAnimation(name:string) {
        this.pieces.forEach(element => {
            element.PlayAnimation(this.baseName, name);
        });
    }

    CheckHit(b:Bullet) {
        console.log('Check bot hit');
    }

    Destroy() {
        this.gs.events.removeListener('bot_check_hit', this.CheckHit, this);

    }
}