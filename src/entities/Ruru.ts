import initAnimations from "./anims/ruruAnims";

import LaserProjectile from "./LaserProjectile";
import FullChargeParticle from "./FullChargeParticle";
import HitProjectile from "./HitProjectile";

class Ruru extends Phaser.Physics.Arcade.Sprite {
  middleOfAnimation: boolean = false;
  ruruState: string = "idle";
  defaultX: number;
  defaultY: number;

  health: number = 100;
  stemena: number = 40;

  auraDuration: number = 0;
  auraTween: any;

  particleGroup!: Phaser.Physics.Arcade.Group;

  constructor(scene, x, y) {
    super(scene, x, y, "ruru-idle");

    this.defaultX = x;
    this.defaultY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    initAnimations(this.scene.anims);

    this.setScale(2);
    this.setInputs();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.particleGroup = this.scene.physics.add.group();
  }

  setInputs() {
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
      .sprite(this.defaultX - 30, this.defaultY - 60, "ruru-pahgyeokjang")
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

    this.scene.enemy.getHit();
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
      .sprite(this.defaultX, this.defaultY - 50, "ruru-punch")
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

    this.scene.enemy.getHit();
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
      .sprite(this.defaultX - 40, this.defaultY - 40, "ruru-special-kick")
      .setScale(2);
    ruru_special.play("ruru-special-kick", true);

    await this.scene.setDelay(200);
    this.scene.sound.add("hitSound", { volume: 0.3 }).play();
    await this.scene.setDelay(300);

    const projectile1 = new LaserProjectile(
      this.scene,
      this.defaultX,
      this.y - 60
    );
    await this.scene.setDelay(200);
    const projectile2 = new LaserProjectile(
      this.scene,
      this.defaultX + 150,
      this.y
    );
    await this.scene.setDelay(400);
    const projectile3 = new LaserProjectile(
      this.scene,
      this.defaultX + 300,
      this.y - 60
    );

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

  returnParticles() {
    this.particleGroup.getChildren().forEach((particle) => {
      if (particle.getBounds().top <= 400) {
        particle.destroy();
      }
    });
  }

  update() {
    this.stemenaUpdate();
    this.ruruStateUpdate();

    this.auraDuration += 16;
    if (this.stemena >= 100 && this.auraDuration > 700) {
      const randNum = Math.random() * 130;
      const randNum2 = Math.random() * 130;
      const randNum3 = Math.random() * 130;

      this.particleGroup.add(
        new FullChargeParticle(
          this.scene,
          this.defaultX - 10 + randNum2,
          this.defaultY + randNum
        )
      );

      this.particleGroup.add(
        new FullChargeParticle(
          this.scene,
          this.defaultX - 10 + randNum3,
          this.defaultY + randNum3
        )
      );

      this.particleGroup.add(
        new FullChargeParticle(
          this.scene,
          this.defaultX - 120 + randNum,
          this.defaultY + randNum2
        )
      );
      this.particleGroup.setVelocityY(-200);

      this.auraDuration = 0;

      this.returnParticles();
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
