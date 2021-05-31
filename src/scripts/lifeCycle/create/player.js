import { PLAYER as PLAYER_ASSET } from "../../constants/assets";
import { LEFT, RIGHT, TURN } from "../../constants/animations/player";

import { applyScoreTemplate } from "./constants/literals";

export default (that) => {
  const initScoreTimer = () => {
    const STEP = 1;
    const DELAY = 100;

    setTimeout(() => {
      function gameOver() {
        that.gameOver = true;

        const RED = 0xff0000;

        that.physics.pause();

        that.player.setTint(RED);
        that.player.anims.play("turn");
      }

      if (!that.playerIsTalking) {
        that.score -= STEP;
        that.scoreText.setText(applyScoreTemplate(Math.ceil(that.score)));
      }

      if (that.score > 0) {
        initScoreTimer();
      } else {
        gameOver();
      }
    }, DELAY);
  };

  const createAnimations = () => {
    that.anims.create({
      key: LEFT,
      frames: that.anims.generateFrameNumbers(PLAYER_ASSET, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    that.anims.create({
      key: TURN,
      frames: [{ key: PLAYER_ASSET, frame: 4 }],
      frameRate: 20,
    });

    that.anims.create({
      key: RIGHT,
      frames: that.anims.generateFrameNumbers(PLAYER_ASSET, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  };

  const createCollisions = () => {
    function speakWithNPC(player, NPC) {
      //console.log(player, "speaking with", NPC);
      //const speed = 0.01;
      const STEP = 1;

      if (!that.gameOver) {
        if (NPC.data.patience > 0) {
          NPC.data.patience -= STEP;
          this.bubbles.children.entries[NPC.data.id].setAlpha(
            NPC.data.patience / 100
          );

          that.playerIsTalking = true;

          if (that.score < 100) {
            that.score += STEP;

            that.scoreText.setText(applyScoreTemplate(Math.ceil(that.score)));
          } else {
            console.log("Your happyness is full!");
          }
        } else {
          console.log("NPC walks away!");
        }
      }
    }

    that.player.setCollideWorldBounds(true);
    that.physics.add.collider(that.player, that.platforms);
    that.physics.add.overlap(that.player, that.npcs, speakWithNPC, null, that);
  };

  that.player = that.physics.add.sprite(100, 450, PLAYER_ASSET);
  //that.player.setBounce(0.2);
  createAnimations();
  createCollisions();

  that.playerIsTalking = false;
  initScoreTimer();
};
