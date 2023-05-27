import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import axios from "axios";

export default {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send a command to your server")
    .addStringOption((option) =>
      option.setName("identifier")
        .setDescription("Your server identifier")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("command")
        .setDescription("Command you want to send on the server")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const id = interaction.options.get("identifier").value;
    const command = interaction.options.get("command").value;
    try {
      await axios.post(`/servers/${id}/command`, {
        "command": command,
      });
    }
    catch (error) {
      console.log(error);
    }

    // TODO: Reply what's return in the server's console in an embed code message
    return interaction.reply("Your command has been send to the server successfully");
  },
};
