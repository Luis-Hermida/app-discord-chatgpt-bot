/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, Collection } from "discord.js";

export default class MyClient extends Client {
  commands: Collection<any, any>;

  constructor(options: any) {
    super(options);
    this.commands = new Collection();
    this.loadCommands();
  }

  loadCommands() {}
}
