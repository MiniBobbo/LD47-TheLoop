import Phaser from 'phaser'
import { M } from '../enums/M';
import { GameScene } from '../scene/GameScene'

export class MusicSubsystem {
    gs:Phaser.Scene;
    constructor(gs:Phaser.Scene){
        this.gs = gs;
        this.gs.events.on('music_on', this.PlayMusic, this);
        this.gs.events.on('music_off', this.StopMusic, this);
    }

    PlayMusic(music:M) {
        switch (music) {
            case M.MAIN_MENU:
                this.gs.sound.play('wind3', {
                    loop:true,
                });
                this.gs.sound.play('wind1', {
                    loop:true,
                    delay:4000
                });
                this.gs.sound.play('wind2', {
                    loop:true,
                    delay:6000
                });
                
                break;
        
            default:
                break;
        }
    }

    StopMusic() {
        this.gs.sound.stopAll();
    }

    Destroy() {
        this.gs.events.off('music_on', this.PlayMusic, this);
        this.gs.events.off('music_off', this.StopMusic, this);

    }

}