import Phaser from "phaser";

export default function create() {
  let stars;
  let bombs;
  let platforms;
  let score = 0;
  let scoreText;

  const createPlatforms = () => {
    const createPlatform = (width, height) =>
      platforms.create(width, height, "ground");

    platforms = this.physics.add.staticGroup();

    createPlatform(400, 568).setScale(2).refreshBody();
    createPlatform(600, 400);
    createPlatform(50, 250);
    createPlatform(750, 220);
  };

  const createStarts = () => {
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);
  };

  const createBombs = () => {
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);
  };

  const createPlayer = () => {
    const PLAYER_ASSET = "gabo";

    const createAnimations = () => {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers(PLAYER_ASSET, {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: PLAYER_ASSET, frame: 4 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers(PLAYER_ASSET, {
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
        scoreText.setText("Score: " + score);

        if (stars.countActive(true) === 0) {
          stars.children.iterate((child) => {
            child.enableBody(true, child.x, 0, true, true);
          });

          //Put bomb on opposite part of the world from the player
          const x =
            player.x < 400
              ? Phaser.Math.Between(400, 800)
              : Phaser.Math.Between(0, 400);

          const bomb = bombs.create(x, 16, "bomb");
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

      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, platforms);
      this.physics.add.overlap(this.player, stars, collectStar, null, this);
      this.physics.add.collider(this.player, bombs, hitBomb, null, this);
    };

    this.player = this.physics.add.sprite(100, 450, PLAYER_ASSET);
    //this.player.setBounce(0.2);
    createAnimations();
    createCollisions();
  };

  this.add.image(0, 0, "sky").setOrigin(0, 0);
  createPlatforms();
  createStarts();
  createBombs();
  createPlayer();

  this.cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#000",
  });
}
