import Phaser from 'phaser'
import { textChangeRangeIsUnchanged } from 'typescript';
import { Bullet } from '../entities/Bullet';
import { PlayerAttack } from '../entities/PlayerAttack';
import { FSM } from '../FSM/FSM';
import { GameScene } from '../scene/GameScene';
import { BotPiece } from './BotPeice';

export class Bot {
    c:Phaser.GameObjects.Container;
    gs:GameScene;
    baseName:string;
    maxHealth:number = 150;
    currentHealth:number = 150;
    private basePiece:BotPiece;
    private pieces:Array<BotPiece>;
    fsm:FSM;
    constructor(gs:GameScene) {
        this.gs = gs;
        this.c = gs.add.container(0,0).setDepth(50);

        this.fsm = new FSM(this);


        this.pieces = [];

        this.gs.events.on('bot_check_hit', this.CheckHit, this);
    }

    changeFSM(nextFSM:string) {

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

    CheckHit(b:PlayerAttack) {
        // this.hitArea.setPosition(this.c.x - this.hitArea.width /2, this.c.y- this.hitArea.height/2);
        // if(!this.IsWithinBounds(b.s.x, b.s.y))
            // return;
        this.pieces.sort((a, b) => b.s.depth - a.s.depth);
        // console.log(`Bullet at ${b.s.x}, ${b.s.y}.\nChecking against texture at ${b.s.x - this.c.x}, ${b.s.y - this.c.y}`);
        let x = b.s.x - this.c.x;
        let y = b.s.y - this.c.y;

        for(let i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].CheckHit(x,y, b)) {
                b.EndBullet();
                break;

            }
        }
    }

    Damage(damage:number) {
        this.currentHealth -= damage;
        // if()
    }


    Destroy() {
        this.gs.events.removeListener('bot_check_hit', this.CheckHit, this);

    }
}