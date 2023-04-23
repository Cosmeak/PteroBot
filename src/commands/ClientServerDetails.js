import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fecthClientServerInfo from "../functions/fetchClientServerInfo.js";
import capitalizeFirstLetter from "../functions/capitalizeFirstLetter.js";
import bytesToSize from "../functions/bytesToSize.js";

export default {
  data: new SlashCommandBuilder()
    .setName("client-server-details")
    .setDescription("Give all know details about the given server")
    .addStringOption((option) =>
      option.setName("server-id")
        .setDescription("Your server identifier")
        .setRequired(true),
    ),
  async execute(interaction) {
    const server = await fecthClientServerInfo(interaction.options.get("server-id").value);
    const embed = new EmbedBuilder()
      .setTitle(server.name)
      .setDescription(server.description ? server.description : "No description...")
      .addFields(
        { name: "Identifier", value: server.identifier, inline: true },
        { name: "Status", value: capitalizeFirstLetter(server.stats.current_state), inline: true },
        { name: "CPU", value: server.stats.resources.cpu_absolute ? `${server.stats.resources.cpu_absolute}%` : "Offline", inline: true },
        { name: "Memory", value: server.stats.resources.memory_bytes ? bytesToSize(server.stats.resources.memory_bytes) : "Offline", inline: true },
        { name: "Disk", value: server.stats.resources.disk_bytes ? bytesToSize(server.stats.resources.disk_bytes) : "Offline", inline: true },
        { name: "Uptime", value: server.stats.resources.uptime ? server.stats.resources.uptime : "Offline", inline: true },
      )
      .setColor("Blurple")
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
