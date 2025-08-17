import type GameScene from "../scenes/GameScene";
import { FoodItem } from "./food-item";
import Furniture from "./furniture";

export default class Oven extends Furniture {
  constructor(scene: GameScene) {
    super(scene, "oven", 500, 50, FoodItem.burger, 0.2);
  }
}
