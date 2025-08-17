import type GameScene from "../scenes/GameScene";
import { FoodItem } from "./food-item";

export default abstract class Furniture {
  private image: Phaser.GameObjects.Image;
  private scene: GameScene;
  private location: {
    x: number;
    y: number;
  };

  constructor(
    scene: GameScene,
    imageName: string,
    x: number,
    y: number,
    foodItem: FoodItem,
    scale: number
  ) {
    this.location = { x, y };
    this.image = scene.add
      .image(this.location.x, this.location.y, imageName)
      .setScale(scale)
      .setInteractive();
    this.scene = scene;

    this.image.on("pointerdown", () => this.moveTo(foodItem));
  }

  moveTo(foodItem: FoodItem) {
    if (this.scene.partManager.getIsGameActive() == true) {
      this.scene.chef.moveTo(this.location.x - 100, this.location.y, () => {
        this.scene.chef.addFoodItem(foodItem);
      });
    }
  }
}
