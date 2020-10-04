import { MusicSubsystem } from "../subsystems/MusicSubsystem";

export class MusicScene extends Phaser.Scene {
    musicsub:MusicSubsystem;
    create() {
        this.musicsub = new MusicSubsystem(this);
    }
}