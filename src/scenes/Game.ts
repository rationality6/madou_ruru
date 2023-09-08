import PhaserSceneTool from "./PhaserSceneTool";
import initAnimations from "../anims/ruruAnims";
import Projectile from "./Projectile";

class GameScene extends PhaserSceneTool {
  ruru: Phaser.GameObjects.Sprite;
  middleOfAnimation: boolean = false;

  constructor() {
    super("GameScene");
  }

  create() {
    initAnimations(this.anims);

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

    this.input.keyboard.on("keydown-SPACE", () => {
      this.castRuruSpecial();
    });

    this.input.on("pointerdown", () => {
      this.castRuruSpecial();
    });

    this.ruru = this.add.sprite(400, 300, "ruru-idle").setScale(2);

    this.ruru.play("ruru-idle", true);
  }

  async castRuruSpecial() {
    if (this.middleOfAnimation === true) {
      return;
    }

    this.middleOfAnimation = true;
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

    await this.setDelay(1000);

    ruru_special.setActive(false).setVisible(false);
    this.ruru.setActive(true).setVisible(true);

    this.middleOfAnimation = false;
    projectile1.destroy();
    projectile2.destroy();
    projectile3.destroy();

    // projectile1.on("animationcomplete", this.doSomething());
  }

  // doSomething = () => {
  //   console.log("done");
  // .setActive(false).setVisible(false)
  // };

  update(time: number, delta: number): void {}
}

export default GameScene;
