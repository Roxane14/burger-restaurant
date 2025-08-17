import Phaser from "phaser";
import Money from "../elements/money";

export default class PartManager extends Phaser.Events.EventEmitter {
  private scene: Phaser.Scene;
  private money: Money;
  private partDuration: number;
  private chronoText!: Phaser.GameObjects.Text;
  private endGameText!: Phaser.GameObjects.Text;
  private startButton!: Phaser.GameObjects.Text;
  private replayButton!: Phaser.GameObjects.Text;
  private isGameActive: boolean = false;

  constructor(
    scene: Phaser.Scene,
    money: Money,
    partDuration: number = 60 * 1000
  ) {
    super();
    this.scene = scene;
    this.money = money;
    this.partDuration = partDuration;

    this.createUI();
  }

  setIsGameActive(isActive: boolean) {
    this.isGameActive = isActive;
  }

  getIsGameActive() {
    return this.isGameActive;
  }

  private createUI() {
    this.chronoText = this.scene.add.text(10, 10, "01:00", {
      font: "20px sans-serif",
      color: "#000",
    });

    this.startButton = this.scene.add
      .text(200, 300, "Commencer la partie", {
        font: "24px sans-serif",
        color: "#fff",
        backgroundColor: "#28a",
        padding: { x: 10, y: 5 },
      })
      .setInteractive();

    this.startButton.on("pointerdown", () => this.startPart());
  }

  private startPart() {
    this.setIsGameActive(true);
    this.emit("partStarted");

    this.money.reset();

    this.startButton.setVisible(false);
    if (this.replayButton) this.replayButton.setVisible(false);
    if (this.endGameText) this.endGameText.setVisible(false);

    const startTime = this.scene.time.now;

    this.scene.time.addEvent({
      delay: this.partDuration,
      callback: () => this.endPart(),
      loop: false,
    });

    this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const elapsed = this.scene.time.now - startTime;
        const remaining = Math.max(this.partDuration - elapsed, 0);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        this.chronoText.setText(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      },
    });
  }

  private endPart() {
    this.setIsGameActive(false);
    this.emit("partEnded");

    this.replayButton = this.scene.add
      .text(200, 300, "Rejouer", {
        font: "24px sans-serif",
        color: "#fff",
        backgroundColor: "#28a",
        padding: { x: 10, y: 5 },
      })
      .setInteractive();

    this.replayButton.on("pointerdown", () => {
      this.startPart();
    });

    this.replayButton.setVisible(true);

    this.endGameText = this.scene.add.text(
      200,
      200,
      `Temps écoulé !\nVous avez gagné ${this.money.getAmount()}€`,
      {
        font: "30px sans-serif",
        color: "#000",
      }
    );
  }
}
