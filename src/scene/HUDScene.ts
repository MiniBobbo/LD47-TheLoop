import Phaser from 'phaser'
import { GameScene } from './GameScene';

export class HUDScene extends Phaser.Scene {
    cockpit:Phaser.GameObjects.Sprite;
    hpBar:Phaser.GameObjects.Graphics;
    enemyBar:Phaser.GameObjects.Graphics;
    hitGraphics:Phaser.GameObjects.Graphics;

    gs:GameScene;

    debug:Phaser.GameObjects.Text;

    create() {

        this.cockpit = this.add.sprite(0,0,'atlas', 'cockpit').setOrigin(0,0);

        this.gs = this.scene.get('game') as GameScene;

        let backBar = this.add.graphics({x:190, y:500});
        backBar.fillStyle(0x992222);
        backBar.fillRect(0,0,1,32);
        backBar.scaleX = 575;

        this.hpBar = this.add.graphics({x:190, y:500});
        this.hpBar.fillStyle(0xffff00);
        this.hpBar.fillRect(0,0,1,32);
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



        //Events
        this.events.on('player_damage', this.DamagePlayer, this);
        this.events.on('destroy', this.Destroy, this);

        this.gs.events.on('debug', this.AddDebug, this);
    }

    Destroy() {
        this.events.removeListener('player_damage', this.DamagePlayer, this);
        this.events.removeListener('destroy', this.Destroy, this);
        this.gs.events.removeListener('debug', this.AddDebug, this);

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

} 