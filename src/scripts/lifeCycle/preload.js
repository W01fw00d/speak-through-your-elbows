import { SKY, GROUND, STAR, BOMB, PLAYER } from "../constants/assets";

export default function preload() {
  const getAsset = (name) => `assets/${name}.png`;
  const loadImage = (name) => this.load.image(name, getAsset(name));

  loadImage(SKY);
  loadImage(GROUND);
  loadImage(STAR);
  loadImage(BOMB);

  this.load.spritesheet(PLAYER, getAsset(PLAYER), {
    frameWidth: 32,
    frameHeight: 48,
  });
}
