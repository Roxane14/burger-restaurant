export default class Money {
  private amount: number;
  private moneyText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.amount = 0;

    const container = scene.add.container(100, 100);

    const bg = scene.add.graphics();
    bg.fillStyle(0xffffff, 1);
    bg.fillRect(0, 0, 90, 150);
    bg.lineStyle(2, 0x000000);
    bg.strokeRect(0, 0, 90, 150);

    const icon = scene.add.image(18, 10, "money").setScale(0.1);
    icon.setOrigin(0, 0);

    this.moneyText = scene.add.text(32, 100, "0€", {
      font: "25px sans-serif",
      color: "#000",
    });

    container.add([bg, icon, this.moneyText]);
  }

  getAmount() {
    return this.amount;
  }
  add(amount: number) {
    this.amount = this.amount + amount;
    this.moneyText.text = `${this.amount}€`;
  }
}
