import Phaser from "phaser";

export default (that) => {
  const PLAYER_ASSET = "gabo";

  let score = 0;

  const createAnimations = () => {
    that.anims.create({
      key: "left",
      frames: that.anims.generateFrameNumbers(PLAYER_ASSET, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    that.anims.create({
      key: "turn",
      frames: [{ key: PLAYER_ASSET, frame: 4 }],
      frameRate: 20,
    });

    that.anims.create({
      key: "right",
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
      star.disableBody(true, true);

      score += 10;
      that.scoreText.setText("Score: " + score);

      if (that.stars.countActive(true) === 0) {
        that.stars.children.iterate((child) => {
          child.enableBody(true, child.x, 0, true, true);
        });

        //Put bomb on opposite part of the world from the player
        const x =
          player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);

        const bomb = that.bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }

    function hitBomb(player) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play("turn");
    }

    that.player.setCollideWorldBounds(true);
    that.physics.add.collider(that.player, that.platforms);
    that.physics.add.overlap(that.player, that.stars, collectStar, null, that);
    that.physics.add.collider(that.player, that.bombs, hitBomb, null, that);
  };

  that.player = that.physics.add.sprite(100, 450, PLAYER_ASSET);
  //that.player.setBounce(0.2);
  createAnimations();
  createCollisions();
};
