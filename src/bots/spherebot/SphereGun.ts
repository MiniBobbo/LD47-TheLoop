import { Bot } from "../Bot";
import { BotPiece } from "../BotPeice";

export class SphereGun extends BotPiece {
    constructor(parent:Bot, num:number) {
        super(parent);
        this.partName = `s${num}`;
        this.health = 40;
        this.armor = 0;
        this.destructable = true;
        this.invulnerable = false;
        this.passalongDamage = 30;

        switch (num) {
            case 1:
                this.fireoffset.set(76, 53);
                break;
            case 2:
                this.fireoffset.set(240, 53);
                break;
            case 3:
                this.fireoffset.set(76, 170);
                break;
            case 4:
                this.fireoffset.set(240, 170);
                break;
        
            default:
                break;
        }


    }
}