import initAnimations from "./anims/witchAnims";

import HitProjectile from "./HitProjectile";

class Witch extends Phaser.Physics.Arcade.Sprite {
  middleOfAnimation: boolean = false;
  witchState: string = "idle";
  defaultX: number;
  defaultY: number;

  health: number = 100;

  auraDuration: number = 0;
  auraTween: any;

  constructor(scene, x, y) {
    super(scene, x, y, "witch-idle");

    this.defaultX = x;
    this.defaultY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    initAnimations(this.scene.anims);

    this.setScale(2);
    this.setInputs();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  setInputs() {
    this.scene.input.on("pointerdown", () => {});
  }

  getHit() {
    const randNum = Math.random() * 150;
    const randNum2 = Math.random() * 150;
    const hit = new HitProjectile(
      this.scene,
      this.defaultX - 80 + randNum,
      this.defaultY - 80 + randNum2
    );

    this.health -= 10;
    this.witchState = "hit";

    setTimeout(() => {
      hit.destroy();
    },1000)
    setTimeout(() => {
      this.witchState = "idle";
    }, 2000);

  }

  update() {
    this.play(`witch-${this.witchState}`, true);
  }
}

export default Witch;
