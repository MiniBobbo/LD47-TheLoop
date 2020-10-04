import { MusicSubsystem } from "../subsystems/MusicSubsystem";

export class MusicScene extends Phaser.Scene {
    musicsub:MusicSubsystem;
    create() {
        if(this.musicsub == null)
            this.musicsub = new MusicSubsystem(this);
    }
}