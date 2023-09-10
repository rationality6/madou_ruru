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
};
