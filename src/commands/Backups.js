import { EmbedBuilder, SlashCommandBuilder, codeBlock, PermissionFlagsBits } from "discord.js";
import axios from "axios";
import fetchClientServerInfo from "../functions/fetchClientServerInfo.js";

export default {
  data: new SlashCommandBuilder()
    .setName("backups")
    .setDescription("Show all your backups")
    .addStringOption((option) =>
      option.setName("identifier")
        .setDescription("Your server identifier")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const id = interaction.options.get("identifier").value;
    let response;
    let server;
    try {
      response = await axios.get(`/servers/${id}/backups`);
      server = await fetchClientServerInfo(id);
    }
    catch (error) {
      console.log(error.response);
      return interaction.reply({ content: error.response.data.errors[0].detail, ephemeral: true });
    }

    const backups = response.data.data;
    let message = codeBlock(`Total backups: + ${backups.length} \n`);
    let backupsMessages = "";
    if (backups.length) {
      backupsMessages += backups.forEach((backup) => message += "💾 " + backup.name + " - " + backup.created_at + "\n");
    }

    message += codeBlock(backupsMessages);

    const embed = new EmbedBuilder()
      .setTitle(`${server.name} • ${server.identifier}`)
      .setDescription(message)
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
