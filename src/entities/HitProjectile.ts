class HitProjectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hitParticle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.play("hitParticle");
    this.setScale(2);
  }
}

export default HitProjectile;
