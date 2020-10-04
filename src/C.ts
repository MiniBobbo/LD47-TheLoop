export class C {
    static BOT_DEPTH:number = 50;

    static GetBulletLevelDamage(level:number):number {
        switch (level) {
            case 1:
                return 1;
            case 2:
                return 5;
            default:
                return 15;
        }
    }
}