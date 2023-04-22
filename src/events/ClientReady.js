const { Events, EmbedBuilder } = require("discord.js");
const Logger = require("../services/Logger");
require("dotenv").config();

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    Logger.success(`Ready! Logged in as ${client.user.tag}`);
  },
};
