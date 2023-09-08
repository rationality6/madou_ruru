export default (anims) => {
  anims.create({
    key: "ruru-idle",
    frames: anims.generateFrameNumbers("ruru-idle", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
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
};
