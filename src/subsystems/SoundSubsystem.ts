import Phaser from 'phaser'
import { GameScene } from '../scene/GameScene'

export class SoundSubsystem {
    gs:GameScene;
    constructor(gs:GameScene){
        this.gs = gs;

        this.gs.events.on('sound', this.PlaySound, this);
    }

    PlaySound(sound:string) {
        switch (sound) {
            case 'explode':
                this.gs.sound.play('explode', {volume:.5});
                
                break;
        
            default:
                break;
        }
    }

    Destroy() {
        this.gs.events.removeListener('sound', this.PlaySound, this);

    }

}