import { BirdBot } from "../bots/BirdBot";
import { Bot } from "../bots/Bot";
import { TestBot } from "../bots/TestBot";
import { GameScene } from "../scene/GameScene";

export class BotFactory {
    static GenerateBot(name:string, gs:GameScene):Bot {
        switch (name) {
            default:
                return new TestBot(gs);
        }
    }
}