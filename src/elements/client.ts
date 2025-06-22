import Dialogue from "./dialogue";

export default class Client {
  private image: Phaser.GameObjects.Image;
  private dialogue: Dialogue | undefined;
  private scene: Phaser.Scene;

  constructor(
    x: number,
    y: number,
    scene: Phaser.Scene,
    previousClientImage?: string
  ) {
    this.scene = scene;
    this.image = scene.add
      .image(x, y, this.getRandomKey(previousClientImage))
      .setScale(0.5)
      .setInteractive();
  }

  getRandomKey(previousKey?: string): string {
    const keys = ["client1", "client2", "client3", "client4", "client5"];
    if (keys.length <= 1) return keys[0];

    let newKey: string;
    do {
      const randomIndex = Math.floor(Math.random() * keys.length);
      newKey = keys[randomIndex];
    } while (newKey === previousKey);

    return newKey;
  }

  destroy() {
    this.image.destroy();
  }

  setDialog(message: string) {
    this.dialogue = new Dialogue(
      this.image.x - 100,
      this.image.y - 100,
      message,
      this.scene
    );
    this.dialogue.displayText();
  }

  getImage() {
    return this.image;
  }

  onClick(callback: (client: Client) => void) {
    return this.image.on("pointerdown", () => callback(this));
  }

  leaveTheRestaurant() {
    this.dialogue?.displayText("Thank you!", 400, () => {
      this.scene.tweens.add({
        targets: this.image,
        x: this.image.x + 500,
        duration: 2000,
        onComplete: () => {
          this.destroy();
        },
      });
      this.dialogue?.destroy();
    });
  }

  moveTo(x: number, duration: number, onComplete?: () => void) {
    this.scene.tweens.add({
      targets: this.image,
      x,
      duration,
      onComplete,
    });
    this.scene.tweens.add({
      targets: this.dialogue?.container,
      x: x - 100,
      duration,
      onComplete,
    });
  }
}
