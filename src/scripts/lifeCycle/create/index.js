import Phaser from "phaser";

import { applyScoreTemplate } from "./constants/literals";
import createPlayer from "./player.js";

export default function create() {
  const createPlatforms = () => {
    const createPlatform = (width, height) =>
      this.platforms.create(width, height, "ground");

    this.platforms = this.physics.add.staticGroup();

    createPlatform(400, 568).setScale(2).refreshBody();
    createPlatform(600, 400);
    createPlatform(50, 250);
    createPlatform(750, 220);
  };

  const createStars = () => {
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
  };

  const createBombs = () => {
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);
  };

  const createScoreText = () => {
    const BLACK = "#000";
    this.scoreText = this.add.text(16, 16, applyScoreTemplate(0), {
      fontSize: "32px",
      fill: BLACK,
    });
  };

  this.add.image(0, 0, "sky").setOrigin(0, 0);
  createPlatforms();
  createStars();
  createBombs();
  createPlayer(this);
  createScoreText();

  this.cursors = this.input.keyboard.createCursorKeys();
}
