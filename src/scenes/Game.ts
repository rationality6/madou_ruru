import PhaserSceneTool from "./PhaserSceneTool";

import Logo from "../entities/Logo";

import Ruru from "../entities/Ruru";
import Witch from "../entities/Witch";

class GameScene extends PhaserSceneTool {
  ruru: Phaser.GameObjects.Sprite;
  enemy: Phaser.GameObjects.Sprite;

  constructor() {
    super("GameScene");
  }

  create() {
    new Logo(this, this.gameWidth - 120, this.gameHeight - 30);

    this.ruru = new Ruru(this, this.gameWidth / 2 + 200, this.gameHeight / 2);

    this.enemy = new Witch(this, this.gameWidth / 2 - 200, this.gameHeight / 2);
  }

  update(time: number, delta: number): void {}
}

export default GameScene;
