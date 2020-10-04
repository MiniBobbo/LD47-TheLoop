import Phaser from 'phaser'
import { PlayerBulletDef } from '../def/PlayerBulletDef';
import { PlayerAttack } from '../entities/PlayerAttack';
import { GameScene } from '../scene/GameScene'

export class PlayerAttackSubsystem {
    gs:GameScene;
    attacks:Array<PlayerAttack>;
    FireDelay:number = 150;
    MaxFireCharge:number = 2500;
    
    CurrentFireDelay:number = 500;
    CurrentFireCharge:number = 0;

    FireReady:boolean;
    Firing:boolean = false;


    constructor(gs:GameScene){
        this.gs = gs;
        this.attacks = [];
   }

   Destroy() {
       this.attacks = null;
   }

    GetBullet():PlayerAttack {
        let b:PlayerAttack;
        for(let i = 0; i < this.attacks.length; i++) {
            if(this.attacks[i].available) {
                b = this.attacks[i];
                break;
            }            
        }
        if(b == null) {
            b = new PlayerAttack(this.gs);
            this.attacks.push(b);
        }
        return b;
    }

    FireBullet(bd:PlayerBulletDef) {
        if(!this.FireReady)
            return;
        let b = this.GetBullet();
        let level = this.GetFireLevel();
        b.Fire(bd.x, bd.y, level);
        this.CurrentFireDelay = this.FireDelay * level;
        this.CurrentFireCharge = 0; 
        this.FireReady = false;
    }

    private GetFireLevel():number {
        if(this.CurrentFireCharge < 1000)
        return 1;
        if(this.CurrentFireCharge < 2500)
        return 2;
        return 3;
    }

    Update(dt:number) {
        this.attacks.forEach(element => {
            element.update(dt);
        });
        if(this.gs.shield.active)
            return;
        if(!this.FireReady && !this.gs.shield.active) {
            this.CurrentFireDelay -= dt;
            if(this.CurrentFireDelay <= 0) {
                this.FireReady = true;
            }
        } else {
            this.CurrentFireCharge += dt;
            if(this.CurrentFireCharge > 2500)
            this.CurrentFireCharge = 2500;
        }

        this.gs.events.emit('firecharge', this.CurrentFireCharge);
            
        if(this.Firing && this.FireReady && !this.gs.shield.active) {
            let bd = new PlayerBulletDef();
            bd.x = this.gs.p.x;
            bd.y = this.gs.p.y;
            this.FireBullet(bd);
    
        }



    }


}