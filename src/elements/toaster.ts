import type GameScene from "../scenes/GameScene";
import { FoodItem } from "./food-item";
import Furniture from "./furniture";

export default class Toaster extends Furniture {
  constructor(scene: GameScene) {
    super(scene, "toaster", 300, 50, FoodItem.toast, 0.15);
  }
}
