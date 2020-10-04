import Phaser from 'phaser'
import { GameScene } from './GameScene';

export class HUDScene extends Phaser.Scene {
    private cockpit:Phaser.GameObjects.Sprite;
    private hpBar:Phaser.GameObjects.Graphics;
    private chargeBar:Phaser.GameObjects.Graphics;
    private enemyBar:Phaser.GameObjects.Graphics;
    private hitGraphics:Phaser.GameObjects.Graphics;

    gs:GameScene;

    debug:Phaser.GameObjects.Text;

    create() {

        this.cockpit = this.add.sprite(0,0,'atlas', 'cockpit1').setOrigin(0,0).setDisplaySize(960,540);

        this.gs = this.scene.get('game') as GameScene;

        let backBar = this.add.graphics({x:190, y:505});
        backBar.fillStyle(0x992222);
        backBar.fillRect(0,0,1,25);
        backBar.scaleX = 575;

        this.hpBar = this.add.graphics({x:190, y:505});
        this.hpBar.fillStyle(0xffff00);
        this.hpBar.fillRect(0,0,1,25);
        this.hpBar.scaleX = 575;

        let backBar2 = this.add.graphics({x:190, y:15});
        backBar2.fillStyle(0x992222);
        backBar2.fillRect(0,0,1,12);
        backBar2.scaleX = 575;

        this.enemyBar = this.add.graphics({x:190, y:15});
        this.enemyBar.fillStyle(0xffff00);
        this.enemyBar.fillRect(0,0,1,12);
        this.enemyBar.scaleX = 575;

        this.debug = this.add.text(10,10, '');

        let chargebackBar = this.add.graphics({x:200, y:490});
        chargebackBar.fillStyle(0x666666);
        chargebackBar.fillRect(0,0,1,15);
        chargebackBar.scaleX = 555;

        this.chargeBar = this.add.graphics({x:200, y:490});
        this.chargeBar.fillStyle(0xffffff);
        this.chargeBar.fillRect(0,0,1,15);
        this.chargeBar.scaleX = 555;


        //Events
        this.events.on('player_damage', this.DamagePlayer, this);
        this.events.on('destroy', this.Destroy, this);
        this.gs.events.on('debug', this.AddDebug, this);
        this.gs.events.on('firecharge', this.SetFireCharge, this);

    }

    Destroy() {
        this.events.removeListener('player_damage', this.DamagePlayer, this);
        this.events.removeListener('destroy', this.Destroy, this);
        this.gs.events.removeListener('debug', this.AddDebug, this);
        this.gs.events.removeListener('firecharge', this.SetFireCharge, this);

    }

    DamagePlayer(newHP:number) {
        // this.scene.get('game').events.emit('shake');
        this.hpBar.scaleX = 575 * (newHP/100);
    }

    AddDebug(message:string, append:boolean = false) {
        if(append) {
            this.debug.text += `${message}\n`;
        } else {
            this.debug.text = `${message}\n`;
        }
    }

    SetFireCharge(charge:number) {
        // if(charge < 1000)
            
        this.chargeBar.scaleX = 555 * (charge / 2500);
    }

} 