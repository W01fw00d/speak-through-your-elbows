export default (that) => {
  const monologues = [...Array(that.N_MONOLOGUES).keys()].map((monologue) =>
    that.sound.add(`monologue${monologue}`)
  );

  const MAX_MONOLOGUES = that.N_MONOLOGUES - 1;
  let current = 0;

  const pause = () => {
    const currentMonologue = monologues[current];
    if (currentMonologue.isPlaying) {
      currentMonologue.pause();
    }
  };

  const play = () => {
    const currentMonologue = monologues[current];
    if (!currentMonologue.isPlaying) {
      if (currentMonologue.isPaused) {
        currentMonologue.resume();
      } else {
        current = current === MAX_MONOLOGUES ? 0 : ++current;

        monologues[current].play();
      }
    }
  };

  return { play, pause };
};
