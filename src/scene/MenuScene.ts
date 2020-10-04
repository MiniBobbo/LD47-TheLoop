import { M } from "../enums/M";
import { GameScene } from "./GameScene";

export class MenuScene extends Phaser.Scene {
    wall:Phaser.GameObjects.TileSprite;
    bg1:Phaser.GameObjects.TileSprite;
    sky:Phaser.GameObjects.TileSprite;
    p:Phaser.GameObjects.Sprite;

    selectables:Array<Phaser.GameObjects.Image>;

    nextOpponent:string = 'sphere';

    movement:number = 10;

    musicScene:Phaser.Scene;
    create() {

        this.CreateBackground();
        this.PointerLock();
        this.input.on('pointerdown', this.Clicked, this);
        // this.input.on('pointerup', this.ClickedOff, this);

        this.events.on('destroy', this.Destroy, this);

        this.selectables = [];

        let sphere = this.add.image(240, 200,'atlas', 'sphere_stand_All').setDepth(10).setScale(.5).setData('name', 'sphere');
        // let sphere2 = this.add.image(120, 200,'atlas', 'sphere_stand_All').setDepth(10).setScale(.5).setData('name', 'sphere2');
        // let sphere3 = this.add.image(360, 200,'atlas', 'sphere_stand_All').setDepth(10).setScale(.5).setData('name', 'sphere3');

        this.selectables = [];
        this.selectables.push(sphere);
        // this.selectables.push(sphere2);
        // this.selectables.push(sphere3);

        this.musicScene = this.scene.get('music');
        this.musicScene.events.emit('music_on', M.MAIN_MENU);
    }

    Destroy() {
        this.input.removeListener('pointerdown', this.Clicked, this);
        this.selectables.forEach(element => {
            element.destroy();
        });
        this.selectables = null;
        this.musicScene = null;
    }

    CreateBackground() {
        this.sky = this.add.tileSprite(0,0, 480, 270, 'atlas', 'lowrezbg_bg').setOrigin(0,0).setDepth(1);
        this.wall  = this.add.tileSprite(0,83, 0, 0, 'atlas', 'lowrezbg_wall').setOrigin(0,0).setDepth(3);
        this.bg1 = this.add.tileSprite(0,154,0, 0,'atlas','lowrezbg_road').setOrigin(0,0).setDepth(2);

        let title = this.add.image(10,10, 'atlas', 'TheLoop').setDepth(10).setOrigin(0,0);
        let subtitle = this.add.image(10,65, 'atlas', 'subtitle').setDepth(10).setOrigin(0,0);

        let select = this.add.image(240, 130, 'atlas', 'SelectTarget').setDepth(10);

    }

    update(dt:number) {
        this.bg1.tilePositionX += this.movement;
        this.wall.tilePositionX += this.movement/5;
        this.sky.tilePositionX += this.movement/50;

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


    Clicked() {
        this.selectables.forEach(element => {
            if(Phaser.Math.Distance.BetweenPoints(this.p, element) < 60) {
                this.nextOpponent = element.getData('name');
                this.LaunchGame();
            }
        });
    }

    LaunchGame() {
        this.events.emit('music_off');
        this.scene.add("game", GameScene, false);
        this.scene.start('game');
    }

}