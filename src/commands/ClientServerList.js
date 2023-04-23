import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios from "axios";
import { config } from "dotenv";
config();

export default {
  data: new SlashCommandBuilder()
    .setName("client-server-list")
    .setDescription("List all servers"),
  async execute(interaction) {
    const response = await axios.get(`${process.env.PTERO_HOST}/api/client/`, {
      "headers": {
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.PTERO_TOKEN}`,
      },
    });

    console.log(response);

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
