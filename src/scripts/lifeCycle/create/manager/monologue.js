export default (that) => {
  const monologues = [
    that.sound.add(`monologue1`),
    that.sound.add(`monologue2`),
    that.sound.add(`monologue3`),
  ];

  const MAX_MONOLOGUES = monologues.length - 1;
  let current = 0;

  const stop = () => {
    if (monologues[current].isPlaying) {
      monologues[current].stop();
    }
  };

  const pause = () => {
    if (monologues[current].isPlaying) {
      monologues[current].pause();
    }
  };

  const play = () => {
    if (!monologues[current].isPlaying) {
      if (current === MAX_MONOLOGUES) {
        current = 0;
      } else {
        current++;
      }

      monologues[current].play();
    }
  };

  return { play, pause, stop };
};
