import Phaser from "phaser";

import preload from "./lifeCycle/preload";
import create from "./lifeCycle/create/index";
import update from "./lifeCycle/update";

const init = () => {
  const gravity = { y: 200 };
  const debug = true;

  new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity,
        debug,
      },
    },
    scene: {
      preload,
      create,
      update,
    },
  });
};

document.addEventListener("DOMContentLoaded", init);
