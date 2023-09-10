import Phaser from 'phaser';

const SHARED_CONFIG = {
  debug: false
}

export default {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: 'game',
  // pixelArt: true,
  backgroundColor: 'transparent',
  scale: {
    width: 1024,
    height: 768,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },
};
