export default function preload() {
  const getAsset = (name) => `assets/${name}.png`;
  const loadImage = (name) => this.load.image(name, getAsset(name));

  loadImage("sky");
  loadImage("ground");
  loadImage("star");
  loadImage("bomb");

  this.load.spritesheet("gabo", getAsset("gabo"), {
    frameWidth: 32,
    frameHeight: 48,
  });
}
