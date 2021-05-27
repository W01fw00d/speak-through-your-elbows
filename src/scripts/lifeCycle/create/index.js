import Phaser from "phaser";

import createPlayer from "./player.js";

export default function create() {
  let stars;
  let bombs;
  let platforms;

  const createPlatforms = () => {
    const createPlatform = (width, height) =>
      platforms.create(width, height, "ground");

    platforms = this.physics.add.staticGroup();

    createPlatform(400, 568).setScale(2).refreshBody();
    createPlatform(600, 400);
    createPlatform(50, 250);
    createPlatform(750, 220);
  };

  const createStars = () => {
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

  this.add.image(0, 0, "sky").setOrigin(0, 0);
  createPlatforms();
  createStars();
  createBombs();
  createPlayer(this, stars, bombs, platforms);

  this.cursors = this.input.keyboard.createCursorKeys();

  this.scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#000",
  });
}
