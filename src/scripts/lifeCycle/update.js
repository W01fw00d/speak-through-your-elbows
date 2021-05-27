export default function update() {
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160);

    this.player.anims.play("left", true);
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160);

    this.player.anims.play("right", true);
  } else {
    this.player.setVelocityX(0);

    this.player.anims.play("turn");
  }

  if (this.cursors.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-305);
  }
}
