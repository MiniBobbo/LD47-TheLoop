import { TestBot } from "../../bots/TestBot";
import { IFSM } from "../FSM";
import { FSMModule } from "../FSMModule";

export class SphereWait extends FSMModule {
    bot:TestBot;

    delayTime:number = 4000;
    DEFAULT_DELAY_TIME:number = 4000;

    constructor(parent:IFSM) {
        super(parent);
        this.bot = parent as TestBot;
    }

    moduleStart() { 
        this.delayTime = this.DEFAULT_DELAY_TIME;
        let move = 25;
        if(Phaser.Math.Between(0,1) == 0)
        move *= -1;
        this.bot.gs.events.emit('changemovement', move);
    }    

    update(dt:number) {
        this.delayTime -= dt;
        if(this.delayTime <= 0) {
            this.bot.changeFSM('fire');
        }

    }
}