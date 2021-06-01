import { LEFT, RIGHT, TURN } from "../constants/animations/player";

export default function update() {
  const X_VELOCITY = 160;
  const Y_VELOCITY = 305;

  const cancelSpeak = () => {
    this.playerIsTalking = false;
    this.monologueSound.pause();
  };

  const action = {
    moveLeft: () => {
      cancelSpeak();

      this.player.setVelocityX(-X_VELOCITY);

      this.player.anims.play(LEFT, true);
    },
    moveRight: () => {
      cancelSpeak();

      this.player.setVelocityX(X_VELOCITY);

      this.player.anims.play(RIGHT, true);
    },
    stop: () => {
      this.player.setVelocityX(0);

      this.player.anims.play(TURN);
    },
    jump: () => {
      cancelSpeak();

      this.player.setVelocityY(-Y_VELOCITY);
    },
  };

  if (!this.gameOver) {
    if (this.cursors.left.isDown) {
      action.moveLeft();
    } else if (this.cursors.right.isDown) {
      action.moveRight();
    } else {
      action.stop();
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      action.jump();
      this.jumpSound.play();
    }
  }
}
