import Phaser from 'phaser'
import { GameScene } from '../scene/GameScene'

export class SoundSubsystem {
    gs:GameScene;
    constructor(gs:GameScene){
        this.gs = gs;

        this.gs.events.on('sound', this.PlaySound, this);
    }

    PlaySound(sound:string) {
        this.gs.sound.play(sound, {volume:.5});
    }

    Destroy() {
        this.gs.events.removeListener('sound', this.PlaySound, this);

    }

}