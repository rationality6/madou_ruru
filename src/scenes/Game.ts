import PhaserSceneTool from "./PhaserSceneTool";
import initAnimations from "../anims/ruruAnims"

class GameScene extends PhaserSceneTool {
  ruru: Phaser.GameObjects.Sprite;

  constructor() {
    super("GameScene");

  }

  create() {
    initAnimations(this.anims)

    const logo = this.add.image(690, 570, "interpretLogoWithCat");
    logo.setScale(0.3);

    this.add.tween({
      targets: logo,
      duration: 1000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
      alpha: {
        getStart: () => 0.5,
        getEnd: () => 1,
      },
    });

    this.input.keyboard.on("keydown-SPACE", async () => {
      this.ruru.setActive(false).setVisible(false);

      const ruru_special = this.add
        .sprite(380, 250, "ruru-special")
        .setScale(2);
      ruru_special.play("ruru-special", true);

      await this.setDelay(1000);
      ruru_special.setActive(false).setVisible(false);
      this.ruru.setActive(true).setVisible(true);
    });

    this.ruru = this.add.sprite(400, 300, "ruru-idle").setScale(2);

    this.ruru.play("ruru-idle", true);
  }

  update(time: number, delta: number): void {}
}

export default GameScene;
