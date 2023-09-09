import PhaserSceneTool from "./PhaserSceneTool";

import Ruru from "../entities/Ruru";
import Projectile from "../entities/Projectile";

class GameScene extends PhaserSceneTool {
  ruru: Phaser.GameObjects.Sprite;

  constructor() {
    super("GameScene");
  }

  setInterpretLogo(){
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
  }

  create() {
    this.setInterpretLogo()
    
    this.ruru = new Ruru(this, 400, 300);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.castRuruSpecial();
    });

    this.input.on("pointerdown", () => {
      this.castRuruSpecial();
    });
  }

  async castRuruSpecial() {
    if (this.ruru.middleOfAnimation === true) {
      return;
    }

    this.ruru.middleOfAnimation = true;
    this.ruru.setActive(false).setVisible(false);

    const ruru_special = this.add
      .sprite(380, 250, "ruru-special-kick")
      .setScale(2);
    ruru_special.play("ruru-special-kick", true);

    await this.setDelay(200);
    this.sound.add("hitSound", { volume: 0.3 }).play();
    await this.setDelay(300);

    let projectile1 = new Projectile(this, 400, 300);
    let projectile2 = new Projectile(this, 250, 240);
    let projectile3 = new Projectile(this, 550, 240);

    await this.setDelay(500);
    projectile1.destroy();
    projectile2.destroy();
    projectile3.destroy();
    await this.setDelay(300);

    ruru_special.setActive(false).setVisible(false);
    this.ruru.setActive(true).setVisible(true);

    this.ruru.middleOfAnimation = false;
  }

  update(time: number, delta: number): void {}
}

export default GameScene;
