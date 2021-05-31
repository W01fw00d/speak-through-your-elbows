import { SKY, GROUND, PLAYER, NPC_1, BUBBLE } from "../constants/assets";

export default function preload() {
  const loadAssets = () => {
    const getAsset = (name) => `assets/${name}.png`;
    const loadImage = (name) => this.load.image(name, getAsset(name));

    loadImage(SKY);
    loadImage(GROUND);
    loadImage(BUBBLE);

    this.load.spritesheet(PLAYER, getAsset(PLAYER), {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet(NPC_1, getAsset(NPC_1), {
      frameWidth: 32,
      frameHeight: 48,
    });
  };

  const loadSounds = () => {
    this.load.audio("jump", "sounds/jump.wav");
  };

  loadAssets();
  loadSounds();
}
