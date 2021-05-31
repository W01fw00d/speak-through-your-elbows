import { LEFT, RIGHT, TURN } from "../constants/animations/player";

export default function update() {
  const X_VELOCITY = 160;
  const Y_VELOCITY = 305;
  const jumpSound = this.sound.add("jump");

  const action = {
    moveLeft: () => {
      this.player.setVelocityX(-X_VELOCITY);

      this.player.anims.play(LEFT, true);
    },
    moveRight: () => {
      this.player.setVelocityX(X_VELOCITY);

      this.player.anims.play(RIGHT, true);
    },
    stop: () => {
      this.player.setVelocityX(0);

      this.player.anims.play(TURN);
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
    jumpSound.play();
  }

  this.playerIsTalking = false;
}
