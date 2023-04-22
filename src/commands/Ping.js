const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping function to know if bot is operationnal"),
  async execute(interaction) {
    interaction.reply("Pong!")
  }
}
