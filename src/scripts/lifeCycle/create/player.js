import Phaser from "phaser";

import { WIDTH as SCENE_WIDTH } from "../../constants/scene";
import {
  BOMB as BOMB_ASSET,
  PLAYER as PLAYER_ASSET,
} from "../../constants/assets";
import { LEFT, RIGHT, TURN } from "../../constants/animations/player";

import { applyScoreTemplate } from "./constants/literals";

export default (that) => {
  let score = 50;

  const initScoreTimer = () => {
    const STEP = 1;
    const DELAY = 100;

    setTimeout(() => {
      if (!that.playerIsTalking) {
        score -= STEP;
        that.scoreText.setText(applyScoreTemplate(Math.ceil(score)));
      }

      if (score > 0) {
        initScoreTimer();
      } else {
        console.log("Game over!");
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
    function collectStar(player, star) {
      const resetStars = () => {
        that.stars.children.iterate((child) => {
          child.enableBody(true, child.x, 0, true, true);
        });
      };

      const createBomb = () => {
        const getXOppositeFromPlayer = () => {
          const MIDDLE_SCENE_X = SCENE_WIDTH / 2;

          const between = Phaser.Math.Between;

          return player.x < MIDDLE_SCENE_X
            ? between(MIDDLE_SCENE_X, SCENE_WIDTH)
            : between(0, MIDDLE_SCENE_X);
        };

        const bomb = that.bombs.create(
          getXOppositeFromPlayer(),
          16,
          BOMB_ASSET
        );
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);

        const BOMB_VELOCITY = 200;
        bomb.setVelocity(
          Phaser.Math.Between(-BOMB_VELOCITY, BOMB_VELOCITY),
          20
        );
      };

      star.disableBody(true, true);

      score += 10;
      that.scoreText.setText(applyScoreTemplate(score));

      if (that.stars.countActive(true) === 0) {
        resetStars();
        createBomb();
      }
    }

    function speakWithNPC(player, NPC) {
      //console.log(player, "speaking with", NPC);
      //const speed = 0.01;
      const STEP = 1;

      if (NPC.data.patience > 0) {
        NPC.data.patience -= STEP;

        that.playerIsTalking = true;

        if (score < 100) {
          score += STEP;

          that.scoreText.setText(applyScoreTemplate(Math.ceil(score)));
        } else {
          console.log("Your self-expression is full!");
        }
      } else {
        console.log("NPC walks away!");
      }
    }

    function hitBomb(player) {
      const RED = 0xff0000;

      this.physics.pause();

      player.setTint(RED);
      player.anims.play("turn");
    }

    that.player.setCollideWorldBounds(true);
    that.physics.add.collider(that.player, that.platforms);
    //that.physics.add.overlap(that.player, that.stars, collectStar, null, that);
    that.physics.add.overlap(that.player, that.npcs, speakWithNPC, null, that);
    that.physics.add.collider(that.player, that.bombs, hitBomb, null, that);
  };

  that.player = that.physics.add.sprite(100, 450, PLAYER_ASSET);
  //that.player.setBounce(0.2);
  createAnimations();
  createCollisions();

  that.playerIsTalking = false;
  initScoreTimer();
};
