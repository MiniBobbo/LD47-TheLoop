import Phaser from 'phaser'
import { GameScene } from './GameScene';

export class HUDScene extends Phaser.Scene {
    private cockpit:Phaser.GameObjects.Sprite;
    private hpBar:Phaser.GameObjects.Graphics;
    private chargeBar:Phaser.GameObjects.Graphics;
    private enemyBar:Phaser.GameObjects.Graphics;

    targetHPPercent:number=1;
    currentHPPercent:number=0;

    enemyTarget:number=1;
    enemyCurrent:number=0;
    gs:GameScene;

    debug:Phaser.GameObjects.Text;

    HEALTHBAR_WIDTH:number = 300;
    ENEMYBAR_WIDTH:number = 238;
    CHARGEBAR_WIDTH:number = 280;


    create() {

        this.cockpit = this.add.sprite(0,0,'atlas', 'lowrezbg_cockpit').setOrigin(0,0);

        this.gs = this.scene.get('game') as GameScene;

        let backBar = this.add.graphics({x:90, y:254});
        backBar.fillStyle(0x992222);
        backBar.fillRect(0,0,1,16);
        backBar.scaleX = this.HEALTHBAR_WIDTH;

        this.hpBar = this.add.graphics({x:90, y:254});
        this.hpBar.fillStyle(0xffff00);
        this.hpBar.fillRect(0,0,1,16);
        this.hpBar.scaleX = this.HEALTHBAR_WIDTH;

        let backBar2 = this.add.graphics({x:121, y:6});
        backBar2.fillStyle(0x992222);
        backBar2.fillRect(0,0,1,16);
        backBar2.scaleX = this.ENEMYBAR_WIDTH;

        this.enemyBar = this.add.graphics({x:121, y:6});
        this.enemyBar.fillStyle(0xffff00);
        this.enemyBar.fillRect(0,0,1,16);
        this.enemyBar.scaleX = this.ENEMYBAR_WIDTH;

        this.debug = this.add.text(10,10, '');

        let chargebackBar = this.add.graphics({x:100, y:248});
        chargebackBar.fillStyle(0x666666);
        chargebackBar.fillRect(0,0,1,5);
        chargebackBar.scaleX = this.CHARGEBAR_WIDTH;

        this.chargeBar = this.add.graphics({x:100, y:248});
        this.chargeBar.fillStyle(0xffffff);
        this.chargeBar.fillRect(0,0,1,5);
        this.chargeBar.scaleX = this.CHARGEBAR_WIDTH;


        //Events
        this.events.on('player_damage', this.DamagePlayer, this);
        this.events.on('destroy', this.Destroy, this);
        this.gs.events.on('debug', this.AddDebug, this);
        this.gs.events.on('firecharge', this.SetFireCharge, this);
        this.gs.events.on('bot_damage', this.DamageBot, this);

        this.time.addEvent({
            delay:15,
            repeat:-1,
            callback:() => {this.Update(0);},
            callbackScope:this
        });

    }

    Destroy() {
        this.events.removeListener('player_damage', this.DamagePlayer, this);
        this.events.removeListener('destroy', this.Destroy, this);
        this.gs.events.removeListener('debug', this.AddDebug, this);
        this.gs.events.removeListener('firecharge', this.SetFireCharge, this);
        this.gs.events.removeListener('bot_damage', this.DamageBot, this);

    }

    DamagePlayer(newHP:number, maxHP:number) {
        // this.scene.get('game').events.emit('shake');
        this.targetHPPercent = (newHP/maxHP);
    }
    DamageBot(newHP:number, maxHP:number) {
        // this.scene.get('game').events.emit('shake');
        this.enemyTarget = newHP/maxHP;
    }

    AddDebug(message:string, append:boolean = false) {
        if(append) {
            this.debug.text += `${message}\n`;
        } else {
            this.debug.text = `${message}\n`;
        }
    }

    SetFireCharge(charge:number) {
            
        this.chargeBar.scaleX = this.CHARGEBAR_WIDTH * (charge / 2500);
    }

    Update(dt:number) {
        if(Math.abs(this.currentHPPercent - this.targetHPPercent) < .02) {
            this.currentHPPercent = this.targetHPPercent;
            this.hpBar.scaleX = this.HEALTHBAR_WIDTH * this.currentHPPercent;
        } else if(this.currentHPPercent < this.targetHPPercent) {
            this.currentHPPercent += .01;
            this.hpBar.scaleX = this.HEALTHBAR_WIDTH * this.currentHPPercent;
        } else if(this.currentHPPercent > this.targetHPPercent) {
            this.currentHPPercent-= .01;
            this.hpBar.scaleX = this.HEALTHBAR_WIDTH * this.currentHPPercent;
        }

        if(Math.abs(this.enemyCurrent - this.enemyTarget) < .02) {
            this.enemyCurrent = this.enemyTarget;
            this.enemyBar.scaleX = this.ENEMYBAR_WIDTH * this.enemyCurrent; 
        } else if(this.enemyCurrent < this.enemyTarget) {
            this.enemyCurrent+= .01;
            this.enemyBar.scaleX = this.ENEMYBAR_WIDTH * this.enemyCurrent;
        } else if(this.enemyCurrent > this.enemyTarget) {
            this.enemyCurrent-= .01;
            this.enemyBar.scaleX = this.ENEMYBAR_WIDTH * this.enemyCurrent;
        }


            

    }

} 