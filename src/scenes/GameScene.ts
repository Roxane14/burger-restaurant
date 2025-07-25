import Phaser from "phaser";
import chef from "./../assets/chef.png";
import angry from "./../assets/clients/angry.png";
import adventurer from "./../assets/clients/adventurer.png";
import badass from "./../assets/clients/badass.png";
import robot from "./../assets/clients/robot.png";
import zombie from "./../assets/clients/zombie.png";
import money from "./../assets/icon/money.png";
import Client from "../elements/client";
import Money from "../elements/money";

export default class GameScene extends Phaser.Scene {
  private chef!: Phaser.GameObjects.Image;
  private clients: Client[];
  private money!: Money;

  constructor() {
    super("GameScene");
    this.clients = [];
  }

  preload() {
    this.load.image("chef", chef);
    this.load.image("client1", angry);
    this.load.image("client2", adventurer);
    this.load.image("client3", badass);
    this.load.image("client4", robot);
    this.load.image("client5", zombie);
    this.load.image("money", money);
  }

  create() {
    this.chef = this.add.image(400, 150, "chef").setScale(0.5);
    this.initializeClients();
    this.money = new Money(this);
  }

  initializeClients() {
    this.createNewClient();
    this.time.addEvent({
      delay: 2000,
      callback: this.createNewClient,
      callbackScope: this,
      loop: true,
    });
  }

  getNewClientPosition() {
    return 400 - this.clients.length * 140;
  }

  createNewClient() {
    const newClient = new Client(this.getNewClientPosition(), 500, this);

    newClient.setDialog("Can I have a burger please?");
    newClient.onClick((client) => this.serveClient(client));

    this.clients.push(newClient);
  }

  serveClient(client: Client) {
    this.tweens.add({
      targets: this.chef,
      x: client.getImage().x,
      y: client.getImage().y - this.chef.height / 2,
      duration: 500,
      onComplete: () => {
        this.money.add(client.getMoney());
        client.leaveTheRestaurant();
        this.clients.shift();
        this.moveTheQueue();
      },
    });
  }

  moveTheQueue() {
    for (let index = 0; index < this.clients.length; index++) {
      const client = this.clients[index];
      client.moveTo(400 - index * 140, 2000);
    }
  }
}
