import { Events } from "discord.js";
import { Logger } from "../services/Logger.js";
import { config } from "dotenv";
config();

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    Logger.success(`Ready! Logged in as ${client.user.tag}`);
  },
};
