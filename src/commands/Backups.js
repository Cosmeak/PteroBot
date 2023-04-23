import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("backups")
    .setDescription("Show all your backups"),
  async execute(interaction) {

  },
};
