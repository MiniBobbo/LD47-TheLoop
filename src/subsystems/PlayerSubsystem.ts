import { GameScene } from '../scene/GameScene'
import { HUDScene } from '../scene/HUDScene';

export class PlayerSubsystem {
    gs:GameScene;
    maxHP:number = 100;
    hp:number = 100;
    hud:HUDScene;

    constructor(gs:GameScene){
        this.gs = gs;
        this.hud = gs.hudScene;
        this.gs.events.on('player_damage', this.DamagePlayer, this);
    }

    DamagePlayer(damage:number) {
        this.hp -= damage;
        this.gs.events.emit('shake');
        this.hud.events.emit('player_damage', this.hp, this.maxHP);
        
    }

    Destroy() {
        this.gs.events.removeListener('player_damage', this.DamagePlayer, this);

    }




}