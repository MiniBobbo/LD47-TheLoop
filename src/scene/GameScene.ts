import Phaser from 'phaser'
import { Bot } from '../bots/Bot';
import { BulletDef } from '../def/BulletDef';
import { EffectDef } from '../def/EffectDef';
import { E } from '../E';
import { Bullet } from '../entities/Bullet';
import { Shield } from '../entities/Shield';
import { M } from '../enums/M';
import { BotFactory } from '../factory/BotFactory';
import { S } from '../S';
import { AttacksSubsystem } from '../subsystems/AttacksSubsystem';
import { BackgroundSubsystem } from '../subsystems/BackgroundSubsystem';
import { EffectSubsystem } from '../subsystems/EffectSubsystem';
import { PlayerAttackSubsystem } from '../subsystems/PlayerAttackSubsystem';
import { PlayerSubsystem } from '../subsystems/PlayerSubsystem';
import { SoundSubsystem } from '../subsystems/SoundSubsystem';
import { HUDScene } from './HUDScene';

export class GameScene extends Phaser.Scene {
    p:Phaser.GameObjects.Sprite;
    bot:Bot;
    shield:Shield;

    gameStart:boolean = false;

    //Subsystems
    bgsub:BackgroundSubsystem;
    attacksub:AttacksSubsystem;
    playersub:PlayerSubsystem;
    playerAttackSub:PlayerAttackSubsystem;
    effectsub:EffectSubsystem;
    soundsub:SoundSubsystem;

    //Scenes
    hudScene:HUDScene;
    musicScene:Phaser.Scene;

    create() {
        
        this.PointerLock();

        //Events

        this.events.on('startlevel', this.StartLevel, this);
        this.events.on('destroy', this.Dispose, this);
        this.events.on('firebullet', this.FireBullet, this);
        this.events.on('bullet_hit', this.BulletHit, this);
        this.events.on('bullet_blocked', this.BulletBlocked, this);
        this.events.on('charge_level', this.SetChargeLevel, this);
        this.input.on('pointerdown', this.Clicked, this);
        this.input.on('pointerup', this.ClickedOff, this);
        this.events.on('shake', this.Shake, this);
        this.events.on('shake_small', this.SmallShake, this);
        this.events.on('playerwin', this.PlayerWin, this);
        this.events.on('playerlose', this.PlayerLose, this);
        this.events.on('endscene', this.EndScene, this);
        this.events.on('effect', this.Effect, this);


        this.input.keyboard.on('keydown-SPACE', () => {this.shield.emit('shieldon');});
        this.input.keyboard.on('keyup-SPACE', () => {this.shield.emit('shieldoff');});

        this.bot = BotFactory.GenerateBot('', this);

        //Scenes
        this.scene.add('hud', HUDScene, false);
        this.scene.launch('hud');
        this.hudScene = this.scene.get('hud') as HUDScene;
        this.musicScene = this.scene.get('music');
        
        //Subsystems
        this.bgsub = new BackgroundSubsystem(this);
        this.bgsub.CreateBackground();

        this.attacksub = new AttacksSubsystem(this);
        this.playersub = new PlayerSubsystem(this);
        this.playerAttackSub =  new PlayerAttackSubsystem(this);
        this.effectsub = new EffectSubsystem(this);
        this.soundsub = new SoundSubsystem(this);


        this.StartLevel();

        this.musicScene = this.scene.get('music');
        this.musicScene.events.emit('music_on', M.BATTLE);

    }



    StartLevel() {
        
        this.shield = new Shield(this);
        let r = this.add.image(240, 135, 'atlas', 'ready').setDepth(2000);
        let start = this.add.image(240, 135, 'atlas', 'start').setDepth(2000).setAlpha(0);
        
        this.tweens.add({
            targets:r,
            duration:500,
            alpha:0,
            delay:1000,
            onComplete:()=> {start.setAlpha(1);}
        });
        this.tweens.add({
            targets:start,
            duration:1500,
            scaleX:3,
            scaleY:3,
            alpha:0,
            delay:1500,
            onComplete:()=> {this.gameStart = true; this.events.emit('bot_start');}
        });




    }

    Dispose() {
        this.events.removeListener('startlevel', this.StartLevel, this);
        this.events.removeListener('dispose', this.Dispose, this);
        this.events.removeListener('firebullet', this.FireBullet, this);
        this.events.removeListener('bullet_hit', this.BulletHit, this);
        this.events.removeListener('bullet_blocked', this.BulletBlocked, this);
        this.events.removeListener('charge_level', this.SetChargeLevel, this);
        this.events.removeListener('effect', this.Effect, this);
        this.events.removeListener('endscene', this.EndScene, this);

        this.input.removeListener('pointerdown', this.Clicked, this);
        this.events.removeListener('shake', this.Shake, this);
        this.events.removeListener('shake_small', this.SmallShake, this);
        this.input.keyboard.removeListener('keydown-SPACE', () => {this.shield.emit('shieldon');});
        this.input.keyboard.removeListener('keyup-SPACE', () => {this.shield.emit('shieldoff');});
        this.events.removeListener('playerwin', this.PlayerWin, this);
        this.events.removeListener('playerlose', this.PlayerLose, this);

        this.bgsub.Dispose();
        this.effectsub.Destroy();
        this.attacksub.Destroy();
        this.playersub.Destroy();
        this.playerAttackSub.Destroy();
        this.soundsub.Destroy();
    }

    PointerLock() {
        this.input.on('pointerdown', function () {
            //@ts-ignore
            this.input.mouse.requestPointerLock();
    
        }, this);

        this.p = this.add.sprite(240, 135, 'atlas', 'cursor_flash_0')
        .setDepth(1000).setAlpha(.75);
    
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
                this.p.x = Phaser.Math.Clamp(this.p.x, 0, 480);
                //@ts-ignore
                this.p.y = Phaser.Math.Clamp(this.p.y, 0, 270);
                
            }
        }, this);
    
    }

    update(time:number, dt:number) {

        if(!this.gameStart)
            return;
        this.shield.s.setPosition(this.p.x, this.p.y);
        this.bot.Update(time, dt);


        //Update subsystems
        this.bgsub.update(dt);
        this.attacksub.Update(dt);
        this.playerAttackSub.Update(dt);

        
    }

    FireBullet(data:BulletDef) {
        this.attacksub.FireBullet(data);
    }

    BulletHit(b:Bullet) {
        if(this.shield.active && Phaser.Math.Distance.BetweenPoints(this.p, b.s) < b.radius + this.shield.radius) {
            this.events.emit('bullet_blocked', b);
        } else {
            this.playersub.DamagePlayer(b.strength);
        }
    }

    BulletBlocked(b:Bullet) {
        let ed:EffectDef = new EffectDef();
        ed.effect = E.SHIELDED;
        ed.x = b.s.x;
        ed.y = b.s.y;
        this.events.emit('effect', ed);
        this.events.emit('sound', S.SHIELDED);
        this.shield.s.play('shield_block', true);
    }

    Clicked() {
        this.playerAttackSub.Firing = true;
    }

    ClickedOff() {
        this.playerAttackSub.Firing = false;
    }
    
    Shake() {
        // this.cameras.main.flash(100);
        this.cameras.main.flash(800, 255,20,20, true);
        this.cameras.main.shake(500, .02, true);
    }

    SmallShake() {
        this.cameras.main.shake(200, .01, true);
    }


    SetChargeLevel(level:number) {

    }

    Flash(s:Phaser.GameObjects.Sprite) {
        //TODO: Fix the flash so it doesn't occasionally make the piece invisible.
        this.time.addEvent({
            repeat:13,
            delay:30,
            callback:()=>{s.visible = !s.visible;},
        });
    }

    FlashFast(s:Phaser.GameObjects.Sprite) {
        s.setVisible(false);
        this.time.addEvent({
            repeat:6,
            delay:30,
            callback:()=>{s.visible = !s.visible;},
            callbackScope:this
        });
    }

    PlayerWin() {
        this.gameStart = false;
        this.time.addEvent({
            repeat:30,
            delay:200,
            callback:() =>{
                let ed = new EffectDef();
                ed.effect = E.EXPLODE;
                ed.x = Phaser.Math.Between(this.bot.position.x, this.bot.position.x + 200);
                ed.y = Phaser.Math.Between(this.bot.position.y, this.bot.position.y + 200);
                this.events.emit('effect', ed);
            }
        });
        this.cameras.main.fade(5000, 255,255,255, true, (cam:any, progress:number) => {
            if(progress==1) {
                this.time.addEvent({
                    delay:3000,
                    callback:() => {
                        this.events.emit('endscene');
                    }
                });
            }
        });

    }

    PlayerLose() {
        this.gameStart = false;
        this.time.addEvent({
            repeat:30,
            delay:200,
            callback:() =>{
                let ed = new EffectDef();
                ed.effect = E.EXPLODE;
                ed.x = Phaser.Math.Between(0, 480);
                ed.y = Phaser.Math.Between(0,270);
                this.events.emit('effect', ed);
            }
        });
        this.cameras.main.fade(5000, 255,0,0, true, (cam:any, progress:number) => {
            if(progress==1) {
                this.time.addEvent({
                    delay:3000,
                    callback:() => {
                        this.events.emit('endscene');
                    }
                });
            }
        });
        
    }

    Effect(def:EffectDef) {
        this.effectsub.PlayEffect(def);
    }

    EndScene() {
        this.scene.remove('hud');
        this.scene.remove('game');
        this.scene.start('menu');
    }
}