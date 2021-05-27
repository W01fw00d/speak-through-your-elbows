export default function update() {
  const X_VELOCITY = 160;
  const Y_VELOCITY = 305;

  const action = {
    moveLeft: () => {
      this.player.setVelocityX(-X_VELOCITY);

      this.player.anims.play("left", true);
    },
    moveRight: () => {
      this.player.setVelocityX(X_VELOCITY);

      this.player.anims.play("right", true);
    },
    stop: () => {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    },
    jump: () => {
      this.player.setVelocityY(-Y_VELOCITY);
    },
  };

  if (this.cursors.left.isDown) {
    action.moveLeft();
  } else if (this.cursors.right.isDown) {
    action.moveRight();
  } else {
    action.stop();
  }

  if (this.cursors.up.isDown && this.player.body.touching.down) {
    action.jump();
  }
}
