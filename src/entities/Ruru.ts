import initAnimations from "./anims/ruruAnims";

import LaserProjectile from "./LaserProjectile";
import FullChargeParticle from "./FullChargeParticle";

class Ruru extends Phaser.Physics.Arcade.Sprite {
  middleOfAnimation: boolean = false;
  ruruState: string = "idle";
  defaultX: number;
  defaultY: number;
  stemena: number = 40;

  auraDuration: number = 0;
  auraTween: any;

  constructor(scene, x, y) {
    super(scene, x, y, "ruru-idle");

    this.defaultX = x;
    this.defaultY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    initAnimations(this.scene.anims);

    this.setScale(2);
    this.setInpurts();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  setInpurts() {
    this.scene.input.on("pointerdown", () => {
      if (this.stemena >= 100) {
        this.castRuruSpecial();
      } else if (this.stemena < 100 && this.stemena >= 50) {
        this.castRuruPahGyeokJang();
      } else {
        this.castRuruPunch();
      }
    });
  }

  async castRuruPahGyeokJang() {
    if (this.middleOfAnimation === true) {
      return;
    }
    this.stemena -= 40;
    this.middleOfAnimation = true;
    this.setActive(false).setVisible(false);

    const ruru_pahgyeokjang = this.scene.add
      .sprite(380, 250, "ruru-pahgyeokjang")
      .setScale(2);
    ruru_pahgyeokjang.x += 20;
    ruru_pahgyeokjang.y += 60;
    ruru_pahgyeokjang.play("ruru-pahgyeokjang", true);

    await this.scene.setDelay(500);
    this.scene.sound.add("hitSound", { volume: 0.3 }).play();
    this.scene.cameras.main.shake(50);
    await this.scene.setDelay(500);

    ruru_pahgyeokjang.setActive(false).setVisible(false);
    this.setActive(true).setVisible(true);

    this.middleOfAnimation = false;
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
    this.scene.cameras.main.shake(50);
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

    const projectile1 = new LaserProjectile(this.scene, 400, 300);
    const projectile2 = new LaserProjectile(this.scene, 250, 240);
    const projectile3 = new LaserProjectile(this.scene, 550, 240);

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
      this.x = this.defaultX + 1;
      this.y = this.defaultY + 1;
    } else if (this.stemena >= 100) {
      this.ruruState = "high";
      this.x = this.defaultX - 5;
      this.y = this.defaultY + 5;
    } else {
      this.ruruState = "low";
      this.x = this.defaultX - 11;
      this.y = this.defaultY - 10;
    }
    this.play(`ruru-${this.ruruState}`, true);
  }

  update() {
    this.stemenaUpdate();
    this.ruruStateUpdate();

    this.auraDuration += 16;
    if (this.stemena >= 100 && this.auraDuration > 700) {
      const randNum = Math.random() * 130;
      const randNum2 = Math.random() * 130;
      new FullChargeParticle(this.scene, 250 + randNum, 370 + randNum2);
      new FullChargeParticle(this.scene, 380 + randNum2, 360 + randNum);
      this.auraDuration = 0;
    }

    if (!this.auraTween && this.stemena >= 100) {
      this.auraTween = this.playAuraTween();
    }
    if (this.stemena < 100 && this.auraTween) {
      this.auraTween.stop();
      this.auraTween = null;
      this.setAlpha(1);
    }
  }

  playAuraTween() {
    this.scene.sound.add("ruruYell", { volume: 1 }).play();
    return this.scene.tweens.add({
      targets: this,
      duration: 300,
      repeat: -1,
      ease: "Sine.easeInOut",
      alpha: {
        getStart: () => 0.7,
        getEnd: () => 1,
      },
    });
  }
}

export default Ruru;
