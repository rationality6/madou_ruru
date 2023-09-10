class Logo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "interpretLogoWithCat");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.3);

    this.postFX.addShine(1, 0.8, 5);
    
    scene.add.tween({
      targets: this,
      duration: 1000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
      alpha: {
        getStart: () => 0.5,
        getEnd: () => 1,
      },
    });
  }
}

export default Logo;
