import { FoodItem, FoodItems } from "./food-item";

export default class Chef {
  private container: Phaser.GameObjects.Container;
  private chefImage: Phaser.GameObjects.Image;
  private holdedItemImage?: Phaser.GameObjects.Image;
  private scene: Phaser.Scene;
  private holdedItem?: FoodItem;
  private currentTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.chefImage = this.scene.add.image(0, 0, "chef").setScale(0.5);

    this.container = scene.add.container(400, 150, [this.chefImage]);
  }

  getImage() {
    return this.container;
  }

  moveTo(x: number, y: number, done?: () => void) {
    this.currentTween?.stop();
    this.currentTween = this.scene.tweens.add({
      targets: this.container,
      x,
      y,
      duration: 300,
      onComplete: () => {
        done?.();
      },
    });
  }

  getHoldedItem() {
    return this.holdedItem;
  }

  addFoodItem(foodItem: FoodItem) {
    this.removeFoodItem();
    this.holdedItem = foodItem;
    this.holdedItemImage = this.scene.add
      .image(40, 15, FoodItems.getImage(foodItem))
      .setScale(0.1);
    this.container.add(this.holdedItemImage);
  }

  removeFoodItem() {
    this.holdedItem = undefined;
    this.holdedItemImage?.destroy();
  }
}
