export enum FoodItem {
  burger,
  toast,
  salad,
}

const FoodItemImages: Record<FoodItem, string> = {
  [FoodItem.burger]: "burger",
  [FoodItem.toast]: "toast",
  [FoodItem.salad]: "salad",
};
const FoodItemNames: Record<FoodItem, string> = {
  [FoodItem.burger]: "burger",
  [FoodItem.toast]: "toast",
  [FoodItem.salad]: "salad",
};

export namespace FoodItems {
  export function getImage(item: FoodItem) {
    return FoodItemImages[item];
  }
  export function getName(item: FoodItem) {
    return FoodItemNames[item];
  }
}
