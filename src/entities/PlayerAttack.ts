import Phaser from 'phaser'
import { isThisTypeNode } from 'typescript';
import { GameScene } from '../scene/GameScene';

export class PlayerAttack {
    gs:GameScene;
    available:boolean = true;
    level:number = 1;
    s:Phaser.GameObjects.Sprite;
    position:number = 500;
    speed:number = 2000;
    radius:number = 30;
    rotationSpeed:number = 5;
    CheckedHitBot:boolean = false;

    constructor(gs:GameScene){
        this.gs = gs;
        this.s = gs.add.sprite(0,0, 'atlas', 'playershot_small_0').setDisplaySize(60,60);
    }

    Fire(x:number, y:number, level:number) {
        this.CheckedHitBot = false;
        this.position = 500;
        this.s.setDisplaySize(this.radius*2,this.radius*2);
        this.s.visible = true;
        this.available = false;
        this.s.setPosition(x,y);
        this.level= level;

        switch (level) {
            case 1:
                this.s.setFrame('playershot_small_0');
                break;
            case 2:
                this.s.setFrame('shot');
                this.gs.events.emit('shake_small');
            break;
            case 3:
                this.s.setFrame('shot');
                this.gs.events.emit('shake_small');
            break;
            default:
                break;
        }
    }

    update(dt:number) {
        if(!this.available) {
            dt/=1000;
            this.position -= this.speed * (dt);
            this.UpdateVisual();
            if(!this.CheckedHitBot && this.position < 50) {
            }
            if(this.position <= 0) {
                if(!this.CheckedHitBot) {
                    this.CheckedHitBot = true;
                    this.gs.events.emit('bot_check_hit', this);
                }
                // this.gs.events.emit('bot_check_hit', this);
                this.available = true;
                this.s.setVisible(false);
            }
        }
    }

    private UpdateVisual() {
        let percentage = this.position / 300;
        this.s.setDepth(this.position + 200);
        let bonussize = 1;
        if(this.level > 1)
        bonussize = 3;
        let displaySize = 10 + (this.radius*3 * bonussize) * percentage;
        this.s.setDisplaySize(displaySize, displaySize);
        this.s.angle -= this.rotationSpeed;

    }

}