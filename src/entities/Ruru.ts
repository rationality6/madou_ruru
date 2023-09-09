import initAnimations from "./anims/ruruAnims";

class Ruru extends Phaser.Physics.Arcade.Sprite {
  middleOfAnimation: boolean = false;

  constructor(scene, x, y) {
    super(scene, x, y, "ruru-idle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    initAnimations(this.scene.anims);

    this.play("ruru-idle");
    this.setScale(2);
  }
}

export default Ruru;
