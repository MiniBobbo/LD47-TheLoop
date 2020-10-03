import Phaser from 'phaser'
import { Bot } from '../bots/Bot';
import { BulletDef } from '../def/BulletDef';
import { Bullet } from '../entities/Bullet';
import { Shield } from '../entities/Shield';
import { AttacksSubsystem } from '../subsystems/AttacksSubsystem';
import { BackgroundSubsystem } from '../subsystems/BackgroundSubsystem';
import { PlayerSubsystem } from '../subsystems/PlayerSubsystem';
import { HUDScene } from './HUDScene';

export class GameScene extends Phaser.Scene {
    p:Phaser.GameObjects.Sprite;
    bot:Bot;
    shield:Shield;

    //Subsystems
    bgsub:BackgroundSubsystem;
    attacksub:AttacksSubsystem;
    playersub:PlayerSubsystem;

    //Scenes
    hudScene:HUDScene;

    create() {
        
        this.PointerLock();

        //Events

        this.events.on('startlevel', this.StartLevel, this);
        this.events.on('destroy', this.Dispose, this);
        this.events.on('firebullet', this.FireBullet, this);
        this.events.on('bulet_hit', this.BulletHit, this);
        this.input.on('pointerdown', this.Clicked, this);

        this.bot = new Bot(this);
        
        //Subsystems
        this.bgsub = new BackgroundSubsystem(this);
        this.bgsub.CreateBackground();

        this.attacksub = new AttacksSubsystem(this);
        this.playersub = new PlayerSubsystem(this);


        //Scenes
        this.scene.add('hud', HUDScene, false);
        this.scene.launch('hud');
        this.hudScene = this.scene.get('hud') as HUDScene;

        this.StartLevel();
    }



    StartLevel() {
        this.shield = new Shield(this);
    }

    Dispose() {
        this.events.removeListener('startlevel', this.StartLevel, this);
        this.events.removeListener('dispose', this.Dispose, this);
        this.events.removeListener('firebullet', this.FireBullet, this);
        this.events.removeListener('bulet_hit', this.BulletHit, this);
        this.input.removeListener('pointerdown', this.Clicked, this);

        this.bgsub.Dispose();
    }

    PointerLock() {
        this.input.on('pointerdown', function () {
            //@ts-ignore
            this.input.mouse.requestPointerLock();
    
        }, this);

        this.p = this.add.sprite(240, 135, 'atlas', 'cursor_flash_0')
        .setDepth(1000);
    
        // When locked, you will have to use the movementX and movementY properties of the pointer
        // (since a locked cursor's xy position does not update)
            //@ts-ignore
            this.input.on('pointermove', function (pointer) {
            //@ts-ignore
            if (this.input.mouse.locked)
            {
                //@ts-ignore
                this.p.x += pointer.movementX;
                //@ts-ignore
                this.p.y += pointer.movementY;
                //@ts-ignore
                this.p.x = Phaser.Math.Clamp(this.p.x, 0, 960);
                //@ts-ignore
                this.p.y = Phaser.Math.Clamp(this.p.y, 0, 540);
                
            }
        }, this);
    
    }

    update(time:number, dt:number) {

        this.shield.s.setPosition(this.p.x, this.p.y);

        //Update subsystems
        this.bgsub.update(dt);
        this.attacksub.Update(dt);

        
    }

    FireBullet(data:BulletDef) {
        this.attacksub.FireBullet(data);
    }

    BulletHit(b:Bullet) {

    }

    Clicked() {
        console.log('clicked');
        let bd = new BulletDef();
        bd.x = this.p.x;
        bd.y = this.p.y;
        bd.xMotion = 100;
        bd.yMotion = 100;
        this.FireBullet(bd);
    }
}