import PhaserSceneTool from "./PhaserSceneTool";

import Ruru from "../entities/Ruru";
import Logo from "../entities/Logo";

class GameScene extends PhaserSceneTool {
  ruru: Phaser.GameObjects.Sprite;

  constructor() {
    super("GameScene");
  }

  create() {
    new Logo(this, 690, 570);
    this.ruru = new Ruru(this, 400, 300);
  }

  update(time: number, delta: number): void {}
}

export default GameScene;
