export default (anims) => {
  anims.create({
    key: "witch-idle",
    frames: anims.generateFrameNumbers("witch-idle", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "witch-hit",
    frames: anims.generateFrameNumbers("witch-hit", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "witch-attack",
    frames: anims.generateFrameNumbers("witch-attack", {
      start: 0,
      end: 7,
    }),
    frameRate: 6,
    repeat: 0,
  });

};
