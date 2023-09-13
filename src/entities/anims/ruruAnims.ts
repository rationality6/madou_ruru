export default (anims) => {
  anims.create({
    key: "ruru-idle",
    frames: anims.generateFrameNumbers("ruru-idle", {
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: "ruru-low",
    frames: anims.generateFrameNumbers("ruru-low", {
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: "ruru-high",
    frames: anims.generateFrameNumbers("ruru-high", {
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: "ruru-punch",
    frames: anims.generateFrameNumbers("ruru-punch", {
      start: 0,
      end: 1,
    }),
    frameRate: 5,
    repeat: 0,
  });

  anims.create({
    key: "ruru-pahgyeokjang",
    frames: anims.generateFrameNumbers("ruru-pahgyeokjang", {
      start: 0,
      end: 2,
    }),
    frameRate: 5,
    repeat: 0,
  });

  anims.create({
    key: "ruru-special-kick",
    frames: anims.generateFrameNumbers("ruru-special-kick", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "ruru-special-laser",
    frames: anims.generateFrameNumbers("ruru-special-laser", {
      start: 0,
      end: 4,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "full-charge-particle",
    frames: anims.generateFrameNumbers("particle1", {
      start: 0,
      end: 6,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "hitParticle",
    frames: anims.generateFrameNumbers("hitParticle", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: 0,
  });
};
