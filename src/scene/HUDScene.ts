import Phaser from 'phaser'

export class HUDScene extends Phaser.Scene {
    cockpit:Phaser.GameObjects.Sprite;
    hpBar:Phaser.GameObjects.Graphics;
    enemyBar:Phaser.GameObjects.Graphics;
    hitGraphics:Phaser.GameObjects.Graphics;

    create() {

        this.cockpit = this.add.sprite(0,0,'atlas', 'cockpit').setOrigin(0,0);


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

        //Events
        this.events.on('player_damage', this.DamagePlayer, this);
        this.events.on('destroy', this.Destroy, this);
    }

    Destroy() {
        this.events.removeListener('player_damage', this.DamagePlayer, this);
        this.events.removeListener('destroy', this.Destroy, this);

    }

    DamagePlayer(newHP:number) {
        this.scene.get('game').events.emit('shake');
        this.hpBar.scaleX = 575 * (newHP/100);
    }


} 