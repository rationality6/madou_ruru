import PhaserSceneTool from "./PhaserSceneTool";

class Preload extends PhaserSceneTool {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.loadLoadingScreen();

    this.load.spritesheet("catLaying", "assets/cat_laying.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("ruru-idle", "assets/ruru/ruru_idle.png", {
      frameWidth: 128,
      frameHeight: 180,
    });

    this.load.spritesheet("ruru-special-kick", "assets/ruru/ruru_special_1.png", {
      frameWidth: 140,
      frameHeight: 250,
    });

    this.load.spritesheet("ruru-special-laser", "assets/ruru/ruru_sources_effact_laser.png", {
      frameWidth: 100,
      frameHeight: 200,
    });

    this.loadingImagesMockup();

    this.load.audio("hitSound", "assets/sounds/ruru_hit35.mp3");
    this.load.audio("hitSound2", "assets/sounds/ruru_hit36.mp3");
    this.load.audio("laserSound", "assets/sounds/ruru_special_laser.mp3");
  }

  loadingImagesMockup() {
    [...Array(5).keys()].forEach((i) => {
      this.load.image(`catWalking${i}`, "assets/cat_walking.png");
    });
  }

  loadLoadingScreen() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    // progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 0.8);
      progressBar.fillRect(this.gameWidth / 2 - 160, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", (file) => {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);

    const logo = this.add.image(
      this.gameWidth / 2 - 10,
      this.gameHeight / 2 + 20,
      "interpretLogoWithCat"
    );

    setTimeout(() => {
      this.scene.start("GameScene");
    }, 100);
  }
}

export default Preload;
