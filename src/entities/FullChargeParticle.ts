class FullChargeParticle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "full-charge-particle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setVelocityY(-200)

    this.play("full-charge-particle");
    this.setScale(1);
  }

  // playLaserSound(){
  //   const lasersound = this.scene.sound.add("laserSound", { volume: 0.2 });
  //   lasersound.play();
  // }
}

export default FullChargeParticle;
