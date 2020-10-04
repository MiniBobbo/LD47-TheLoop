import { BotPiece } from "../../bots/BotPeice";
import { TestBot } from "../../bots/TestBot";
import { BulletDef } from "../../def/BulletDef";
import { IFSM } from "../FSM";
import { FSMModule } from "../FSMModule";

export class SphereFire extends FSMModule {
    bot:TestBot;

    delayTime:number = 500;
    DEFAULT_DELAY_TIME:number = 500;

    fireCount:number =0;

    constructor(parent:IFSM) {
        super(parent);
        this.bot = parent as TestBot;
    }

    moduleStart() { 
        this.delayTime = this.DEFAULT_DELAY_TIME;
        this.bot.gs.events.emit('changemovement', 0);
        this.fireCount = Phaser.Math.Between(3,6);
    }    

    update(dt:number) {
        this.delayTime -= dt;
        if(this.delayTime <= 0) {
            let alives = this.bot.spheres.filter((s:BotPiece) => {return !s.destroyed;})
            if(alives.length > 0) {
                let s = this.selectAlive(alives);
                let bd = new BulletDef();
                bd.x = s.s.x + s.fireoffset.x - s.offset.x + this.bot.sway;
                bd.y = s.s.y + s.fireoffset.y - s.offset.y + this.bot.sway;
                bd.strength = 20;
                this.bot.gs.events.emit('firebullet', bd);
                this.fireCount--;
            }
            if(this.fireCount == 0) {
                this.bot.changeFSM('wait');
            } else {
                this.delayTime = this.DEFAULT_DELAY_TIME;
            }
    
        }




    }

    private selectAlive(a:Array<BotPiece>):BotPiece {
        return a[Phaser.Math.Between(0,a.length-1)];
    }
}