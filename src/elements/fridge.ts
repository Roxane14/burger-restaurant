import type GameScene from "../scenes/GameScene";
import { FoodItem } from "./food-item";
import Furniture from "./furniture";

export default class Fridge extends Furniture {
  constructor(scene: GameScene) {
    super(scene, "fridge", 600, 200, FoodItem.salad, 0.3);
  }
}
