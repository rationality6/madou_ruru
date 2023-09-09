class LaserProjectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ruru-special-laser");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.play("ruru-special-laser");
    this.setScale(3);

    this.playLaserSound()
  }

  playLaserSound(){
    const lasersound = this.scene.sound.add("laserSound", { volume: 0.2 });
    lasersound.play();
    this.scene.cameras.main.shake(100);
  }
}

export default LaserProjectile;
