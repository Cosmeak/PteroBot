import { SlashCommandBuilder } from "discord.js";
import fecthClientServerInfo from "../functions/fetchClientServerInfo.js";
import axios from "axios";
import { config } from "dotenv";
config();

export default {
  data: new SlashCommandBuilder()
    .setName("client-server-power")
    .setDescription("Provide a way to up or down a server")
    .addStringOption((option) =>
      option.setName("server-id")
        .setDescription("Your server identifier")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("state")
        .setDescription("Choose a state for your server")
        .setChoices(
          { name: "start", value: "start" },
          { name: "stop", value: "stop" },
          { name: "restart", value: "restart" },
          { name: "kill", value: "kill" },
        )
        .setRequired(true),
    ),
  async execute(interaction) {
    const state = interaction.options.get("state").value;
    const id = interaction.options.get("server-id").value;
    const server = await fecthClientServerInfo(id);

    try {
      await axios.post(`${process.env.PTERO_HOST}/api/client/servers/${id}/power`, {
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.PTERO_TOKEN}`,
        },
        "body": {
          "signal": state,
        },
      });
    }
    catch (error) {
      console.error(error.response.data.errors);
      return interaction.reply("An error occurred with your request...");
    }

    return interaction.reply(`The **${state}** state has been sent to the server **${server.name}**`);
  },
};
