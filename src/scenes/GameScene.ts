import Phaser from "phaser";
import Client from "../elements/client";
import Money from "../elements/money";
import Fridge from "../elements/fridge";
import Chef from "../elements/chef";
import Oven from "../elements/oven";
import Toaster from "../elements/toaster";
import { assets } from "../elements/assets";

export default class GameScene extends Phaser.Scene {
  public chef!: Chef;
  private clients: Client[];
  private money!: Money;

  constructor() {
    super("GameScene");
    this.clients = [];
  }

  preload() {
    assets.forEach((a) => this.load.image(a.key, a.path));
  }

  create() {
    this.chef = new Chef(this);
    this.initializeClients();
    this.money = new Money(this);
    new Fridge(this);
    new Oven(this);
    new Toaster(this);
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
    newClient.onClick((client) => this.serveClient(client));
    this.clients.push(newClient);
  }

  serveClient(client: Client) {
    this.chef.moveTo(
      client.getImage().x,
      client.getImage().y - this.chef.getImage().getBounds().height,
      () => {
        if (this.chef.getHoldedItem() === client.getWantedFood()) {
          this.chef.removeFoodItem();
          this.money.add(client.getMoney());
          client.leaveTheRestaurant();
          this.clients.shift();
          this.moveTheQueue();
        }
      }
    );
  }

  moveTheQueue() {
    for (let index = 0; index < this.clients.length; index++) {
      const client = this.clients[index];
      client.moveTo(400 - index * 140, 2000);
    }
  }
}
