import Dialogue from "./dialogue";
import { FoodItem, FoodItems } from "./food-item";

export default class Client {
  private image: Phaser.GameObjects.Image;
  private dialogue: Dialogue | undefined;
  private scene: Phaser.Scene;
  private moneyToGive: number;
  private wantedFood: FoodItem;

  constructor(x: number, y: number, scene: Phaser.Scene) {
    this.scene = scene;
    this.image = scene.add
      .image(x, y, this.getRandomClientImage())
      .setScale(0.5)
      .setInteractive();
    this.moneyToGive = 4;
    this.wantedFood = this.getRandomWantedFood();

    this.setDialog(
      `Can I have a ${FoodItems.getName(this.wantedFood)} please?`
    );
  }

  getRandomWantedFood() {
    const values = Object.values(FoodItem).filter(
      (v) => typeof v === "number"
    ) as FoodItem[];
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  getWantedFood() {
    return this.wantedFood;
  }

  getRandomClientImage(): string {
    const keys = ["adventurer", "angry", "badass", "robot", "zombie"];

    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
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
    this.image.removeInteractive();
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

  getMoney() {
    const moneyToReturn = this.moneyToGive;
    this.moneyToGive = 0;
    return moneyToReturn;
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
