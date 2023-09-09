import initAnimations from "./anims/ruruAnims";

import Projectile from "./Projectile";

class Ruru extends Phaser.Physics.Arcade.Sprite {
  middleOfAnimation: boolean = false;
  ruruState: string = "idle";
  setDefaultX: number;
  setDefaultY: number;
  stemena: number = 40;

  constructor(scene, x, y) {
    super(scene, x, y, "ruru-idle");

    this.setDefaultX = x;
    this.setDefaultY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    initAnimations(this.scene.anims);

    this.setScale(2);
    this.setInpurts();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  setInpurts() {
    this.scene.input.on("pointerdown", () => {
      Math.random() > 0.5 ? this.castRuruPunch() : this.castRuruSpecial();
    });
  }

  async castRuruPunch() {
    if (this.middleOfAnimation === true) {
      return;
    }

    if (this.stemena < 20) {
      return;
    }
    this.stemena -= 20;

    this.middleOfAnimation = true;
    this.setActive(false).setVisible(false);

    const ruru_punch = this.scene.add
      .sprite(380, 250, "ruru-punch")
      .setScale(2);
    ruru_punch.y += 50;
    ruru_punch.play("ruru-punch", true);

    await this.scene.setDelay(200);
    this.scene.sound.add("hitSound2", { volume: 0.3 }).play();

    await this.scene.setDelay(500);

    ruru_punch.setActive(false).setVisible(false);
    this.setActive(true).setVisible(true);

    this.middleOfAnimation = false;
  }

  async castRuruSpecial() {
    if (this.middleOfAnimation === true) {
      return;
    }

    if (this.stemena < 60) {
      return;
    }
    this.stemena -= 60;

    this.middleOfAnimation = true;
    this.setActive(false).setVisible(false);

    const ruru_special = this.scene.add
      .sprite(380, 250, "ruru-special-kick")
      .setScale(2);
    ruru_special.play("ruru-special-kick", true);

    await this.scene.setDelay(200);
    this.scene.sound.add("hitSound", { volume: 0.3 }).play();
    await this.scene.setDelay(300);

    const projectile1 = new Projectile(this.scene, 400, 300);
    const projectile2 = new Projectile(this.scene, 250, 240);
    const projectile3 = new Projectile(this.scene, 550, 240);

    await this.scene.setDelay(500);
    projectile1.destroy();
    projectile2.destroy();
    projectile3.destroy();
    await this.scene.setDelay(300);

    ruru_special.setActive(false).setVisible(false);
    this.setActive(true).setVisible(true);

    this.middleOfAnimation = false;
  }

  stemenaUpdate() {
    if (this.stemena >= 100) {
      return;
    }

    this.stemena += 0.3;
  }

  ruruStateUpdate() {
    if (this.stemena > 60 && this.stemena < 100) {
      this.ruruState = "idle";
      this.x = this.setDefaultX + 1;
      this.y = this.setDefaultY + 1;
    } else if (this.stemena >= 100) {
      this.ruruState = "high";
      this.x = this.setDefaultX - 5;
      this.y = this.setDefaultY + 5;
    } else {
      this.ruruState = "low";
      this.x = this.setDefaultX - 11;
      this.y = this.setDefaultY - 10;
    }
    this.play(`ruru-${this.ruruState}`, true);
  }

  update() {
    this.stemenaUpdate();
    this.ruruStateUpdate();
    console.log(this.stemena);
  }
}

export default Ruru;
