export default class Dialogue {
  public container: Phaser.GameObjects.Container;
  private background: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;

  padding = 10;

  constructor(
    x: number,
    y: number,
    message: string,
    scene: Phaser.Scene,
    width = 120,
    height = 60
  ) {
    this.background = scene.add.graphics();
    this.background.fillStyle(0xffffff, 1);
    this.background.fillRect(50, 0, width, height);
    this.background.lineStyle(2, 0x000000);
    this.background.strokeRect(50, 0, width, height);

    this.text = scene.add.text(this.padding + 50, this.padding, message, {
      font: "16px sans-serif",
      color: "#000",
      wordWrap: { width: width - this.padding },
    });

    this.container = scene.add.container(x, y, [this.background, this.text]);
    this.container.setVisible(false);
  }

  displayText(message?: string, duration?: number, callback?: () => void) {
    if (message) this.text.setText(message);
    this.container.setVisible(true);
    if (duration) {
      this.container.scene?.time.delayedCall(
        duration,
        callback ||
          (() => {
            this.destroy();
          })
      );
    }
  }

  destroy() {
    this.container.destroy();
  }
}
