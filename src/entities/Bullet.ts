import Phaser from 'phaser'
import { GameScene } from '../scene/GameScene';

export class Bullet {
    s:Phaser.GameObjects.Sprite;
    gs:GameScene;
    available:boolean = true;
    radius:number = 60;
    speed:number = 300;
    position:number = 0;
    xMotion:number = 0;
    yMotion:number = 0;
    constructor(gs:GameScene) {
        this.gs = gs;
        this.s = this.gs.add.sprite(0,0, 'atlas', 'attack_0');
    }

    Fire(x:number, y:number, speed:number, motionX:number = 0, motionY:number) {
        this.position = 0;
        this.s.setDisplaySize(10,10);
        this.s.visible = true;
        this.available = false;
        this.xMotion = motionX;
        this.yMotion = motionY;

        this.s.setPosition(x,y);

    }

    update(dt:number) {
        if(!this.available) {
            dt/=1000;
            this.position += this.speed * (dt);
            this.s.x += this.xMotion * dt;
            this.s.y += this.yMotion * dt;
            this.UpdateVisual();
            if(this.position >= 300) {
                this.gs.events.emit('bullet_hit', this);
                this.available = true;
                this.s.setVisible(false);
            }
        }
    }

    private UpdateVisual() {
        let percentage = this.position / 300;
        this.s.setDepth(this.position + 200);
        let displaySize = 10 + (this.radius*2) * percentage;
        this.s.setDisplaySize(displaySize, displaySize);
    }
}