import PhaserSceneTool from "./PhaserSceneTool";

class GameScene extends PhaserSceneTool {
  constructor() {
    super("GameScene");
  }

  create() {
    const logo = this.add.image(690, 570, "interpretLogoWithCat");
    logo.setScale(0.3);

    this.anims.create({
      key: "ruru-idle",
      frames: this.anims.generateFrameNumbers("ruru-idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    const ruru = this.add.sprite(400, 300, "ruru-idle").setScale(2)
    ruru.play("ruru-idle", true);
  }
}

export default GameScene;
