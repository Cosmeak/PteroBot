import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import axios from "axios";

export default {
  data: new SlashCommandBuilder()
    .setName("servers")
    .setDescription("Show information about your servers")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const response = await axios.get("/");

    let message = "";
    response.data.data.forEach((server) => {
      message += `**${server.attributes.name}** [ ${server.attributes.identifier} ]\n\n`;
    });

    const embed = new EmbedBuilder()
      .setTitle("Your servers")
      .setDescription(message)
      .setColor("Blurple")
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
