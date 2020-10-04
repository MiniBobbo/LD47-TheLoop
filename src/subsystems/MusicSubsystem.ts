import Phaser from 'phaser'
import { M } from '../enums/M';

export class MusicSubsystem {
    gs:Phaser.Scene;
    music:Phaser.Sound.HTML5AudioSound;
    constructor(gs:Phaser.Scene){
        this.gs = gs;
        this.gs.events.on('music_on', this.PlayMusic, this);
        this.gs.events.on('music_off', this.StopMusic, this);
        this.gs.events.on('music_fade', this.FadeMusic, this);

    }

    Destroy() {
        this.gs.events.off('music_on', this.PlayMusic, this);
        this.gs.events.off('music_off', this.StopMusic, this);
        this.gs.events.off('music_fade', this.FadeMusic, this);

    }

    PlayMusic(music:M) {
        if(this.music != null && this.music.isPlaying) {
            var nextSong = music;
            this.gs.tweens.add({
                targets:this.music,
                volume:0,
                duration:500,
                onComplete:() => {
                    this.music.destroy();
                    this.music =this.gs.sound.add(music, {
                        loop:true,
                    }) as Phaser.Sound.HTML5AudioSound;
                    this.music.play();
                },
                onCompleteScope:this
            });
        } else {
            this.music =this.gs.sound.add(music, {
                loop:true,
            }) as Phaser.Sound.HTML5AudioSound;
            this.music.play();
        }


        // switch (music) {
        //     case M.MAIN_MENU:
        //         this.music =this.gs.sound.add(music, {
        //             loop:true,
        //         }) as Phaser.Sound.HTML5AudioSound;
        //         this.music.play();
        //         break;
                
        //     case M.BATTLE:
        //         this.music = this.gs.sound.add('battle', {loop:true}) as Phaser.Sound.HTML5AudioSound;
        //         this.music.play();
        //     default:
        //         break;
        // }
    }


    StopMusic() {
        this.gs.sound.stopAll();
    }

    FadeMusic() {
        if(this.music != null && this.music.isPlaying) {
            this.gs.tweens.add({
                targets:this.music,
                volume:0,
                duration:500,
                onComplete:() => {
                    this.music.destroy();
                },
                onCompleteScope:this
            });

        }
    }


}