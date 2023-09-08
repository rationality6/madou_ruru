class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ruru-special-laser");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    const laser = this.scene.anims.create({
      key: "ruru-special-laser",
      frames: this.scene.anims.generateFrameNumbers("ruru-special-laser", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.play("ruru-special-laser");
    const lasersound = this.scene.sound.add("laserSound", { volume: 0.2 });
    lasersound.play();
    this.setScale(3);
  }
}

export default Projectile;
