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
            
        this.chargeBar.scaleX = 280 * (charge / 2500);
    }

} 