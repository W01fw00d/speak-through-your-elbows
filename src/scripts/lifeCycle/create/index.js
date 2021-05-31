import Phaser from "phaser";

import { SKY, GROUND, STAR, NPC_1 } from "../../constants/assets";

import { applyScoreTemplate } from "./constants/literals";
import createPlayer from "./player.js";

export default function create() {
  const createPlatforms = () => {
    const createPlatform = (width, height) =>
      this.platforms.create(width, height, GROUND);

    this.platforms = this.physics.add.staticGroup();

    createPlatform(400, 568)
      .setScale(2)
      .refreshBody();
    createPlatform(600, 400);
    createPlatform(50, 250);
    createPlatform(750, 220);
  };

  const createStars = () => {
    this.stars = this.physics.add.group({
      key: STAR,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
  };

  const createNPCs = () => {
    this.npcs = this.physics.add.group({
      key: NPC_1,
      repeat: 1,
      //setXY: { x: 450, y: 0, stepX: 50 },
      setXY: { x: 320, y: 450, stepX: 50 }, // Position for testing
    });

    const rightAnim = "right_npc1";
    this.anims.create({
      key: rightAnim,
      frames: [{ key: NPC_1, frame: 5 }],
      frameRate: 20,
    });
    this.npcs.children.entries[0].play(rightAnim);

    this.npcs.children.entries[0].data = { name: "jj", patience: 100 };
    this.npcs.children.entries[1].data = { name: "nacho", patience: 100 };

    this.physics.add.collider(this.npcs, this.platforms);
  };

  const createBombs = () => {
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);
  };

  const createScoreText = () => {
    const BLACK = "#000";
    this.scoreText = this.add.text(16, 16, applyScoreTemplate(50), {
      fontSize: "32px",
      fill: BLACK,
    });
  };

  this.add.image(0, 0, SKY).setOrigin(0, 0);
  createPlatforms();
  //createStars();
  createNPCs();
  createBombs();
  createPlayer(this);
  createScoreText();

  this.cursors = this.input.keyboard.createCursorKeys();
}
