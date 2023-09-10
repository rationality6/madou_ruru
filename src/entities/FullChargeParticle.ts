class FullChargeParticle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "full-charge-particle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.play("full-charge-particle");
    this.setScale(0.5);
  }
}

export default FullChargeParticle;
