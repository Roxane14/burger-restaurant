import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  private chef!: Phaser.GameObjects.Image;
  private client!: Phaser.GameObjects.Image;
  private dialogueBox!: Phaser.GameObjects.Graphics;
  private dialogueText!: Phaser.GameObjects.Text;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("chef", "src/assets/chef.png");
    this.load.image("client", "src/assets/client.png");
  }

  create() {
    // Ajout de la cuisinière
    this.chef = this.add.image(400, 150, "chef").setScale(0.5);

    // Ajout du client
    this.client = this.add
      .image(400, 500, "client")
      .setScale(0.5)
      .setInteractive();
    this.client.setVisible(false);

    // Création de la boîte de dialogue (invisible par défaut)
    this.dialogueBox = this.add.graphics();
    this.dialogueBox.fillStyle(0xffffff, 1);
    this.dialogueBox.fillRect(300, 400, 200, 60);
    this.dialogueBox.lineStyle(2, 0x000000);
    this.dialogueBox.strokeRect(300, 400, 200, 60);
    this.dialogueBox.setVisible(false);

    // Texte de dialogue (invisible par défaut)
    this.dialogueText = this.add.text(310, 420, "Un burger svp !", {
      font: "16px sans-serif",
      color: "#000",
    });
    this.dialogueText.setVisible(false);

    // Clic sur le client
    this.client.on("pointerdown", () => {
      this.serveClient();
    });

    this.addANewClient();
  }

  serveClient() {
    this.tweens.add({
      targets: this.chef,
      x: 400,
      y: 350,
      duration: 500,
      onComplete: () => {
        this.dialogueText.text = "Merci !";
        this.time.delayedCall(1000, () => {
          this.client.setVisible(false);
          this.dialogueBox.setVisible(false);
          this.dialogueText.setVisible(false);
        });
      },
    });
  }

  addANewClient() {
    this.client.setVisible(true);
    this.dialogueBox.setVisible(true);
    this.dialogueText.setVisible(true);
  }
}
