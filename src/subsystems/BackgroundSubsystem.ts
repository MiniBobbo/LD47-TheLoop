import Phaser from 'phaser'
import { GameScene } from '../scene/GameScene'

export class BackgroundSubsystem {
    gs:GameScene;
    wall:Phaser.GameObjects.TileSprite;
    bg1:Phaser.GameObjects.TileSprite;
    sky:Phaser.GameObjects.TileSprite;
    movement:number = 25;
    constructor(gs:GameScene){
        this.gs = gs;


    }

    CreateBackground() {
        this.sky = this.gs.add.tileSprite(0,0, 480, 270, 'atlas', 'lowrezbg_bg').setOrigin(0,0).setDepth(1);
        this.wall  = this.gs.add.tileSprite(0,83, 0, 0, 'atlas', 'lowrezbg_wall').setOrigin(0,0).setDepth(3);
        this.bg1 = this.gs.add.tileSprite(0,154,0, 0,'atlas','lowrezbg_road').setOrigin(0,0).setDepth(2);

    }

    Dispose() {
        this.wall.destroy();
        this.bg1.destroy();
    }

    update(dt:number) {
        this.bg1.tilePositionX += this.movement;
        this.wall.tilePositionX += this.movement/5;
        this.sky.tilePositionX += this.movement/50;

    }
}