import { BulletDef } from '../def/BulletDef';
import { Bullet } from '../entities/Bullet';
import { GameScene } from '../scene/GameScene'

export class AttacksSubsystem {
    gs:GameScene;
    bullets:Array<Bullet>;

    constructor(gs:GameScene){
        this.gs = gs;
        this.bullets = []; 

    }

    GetBullet():Bullet {
        let b:Bullet;
        for(let i = 0; i < this.bullets.length; i++) {
            if(this.bullets[i].available) {
                b = this.bullets[i];
                console.log('Recycling bullet');
                break;
            }            
        }
        if(b == null) {
            b = new Bullet(this.gs);
            this.bullets.push(b);
            console.log('New bullet');
        }
        return b;
    }

    FireBullet(bd:BulletDef) {
        let b = this.GetBullet();
        b.Fire(bd.x, bd.y, bd.speed, bd.xMotion, bd.yMotion);
    }

    Update(dt:number) {
        this.bullets.forEach(element => {
            element.update(dt);
        });
    }

    Destroy() {
        this.bullets = [];
    }

}