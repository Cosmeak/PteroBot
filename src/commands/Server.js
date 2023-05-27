import { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";
import fecthClientServerInfo from "../functions/fetchClientServerInfo.js";
import capitalizeFirstLetter from "../functions/capitalizeFirstLetter.js";
import bytesToSize from "../functions/bytesToSize.js";
import convertMilliseconds from "../functions/convertMilliseconds.js";
import axios from "axios";

export default {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Show informations about a server and control it")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const servers = await axios.get("/");

    const options = [];
    servers.data.data.forEach((server) => {
      console.log(server);
      options.push(new StringSelectMenuOptionBuilder()
        .setLabel(server.attributes.name)
        .setDescription("description")
        .setValue(server.attributes.identifier),
      );
    });

    const select = new StringSelectMenuBuilder()
      .setCustomId("server")
      .setPlaceholder("Select a server")
      .addOptions(options);

    const row = new ActionRowBuilder()
      .addComponents(select);

    const response = await interaction.reply({
      content: "Choose a server",
      components: [row],
    });

    const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 100000 });

    collector.on("collect", async (componentInteraction) => {
      const selection = componentInteraction.values[0];
      const server = await fecthClientServerInfo(selection);
      const embed = new EmbedBuilder()
        .setTitle(`${server.name} • ${server.identifier}`)
        .setDescription(server.description ? server.description : "No description...")
        .addFields(
          { name: "Status", value: (server.stats.current_state === "offline" ? "🔴 " : (server.stats.current_state === "running" ? "🟢 " : "🟠 ")) + capitalizeFirstLetter(server.stats.current_state) },
          { name: "Uptime", value: convertMilliseconds(server.stats.resources.uptime) },
          { name: "CPU", value: `${server.stats.resources.cpu_absolute}%`, inline: true },
          { name: "Memory", value: bytesToSize(server.stats.resources.memory_bytes), inline: true },
          { name: "Disk", value: bytesToSize(server.stats.resources.disk_bytes), inline: true },
        )
        .setColor(server.stats.current_state === "offline" ? "Red" : (server.stats.current_state === "running" ? "Green" : "Orange"))
        .setTimestamp();

      const startButton = new ButtonBuilder()
        .setCustomId(`${server.identifier}-start`)
        .setLabel("Start")
        .setStyle(ButtonStyle.Success);
      const restartButton = new ButtonBuilder()
        .setCustomId(`${server.identifier}-restart`)
        .setLabel("Restart")
        .setStyle(ButtonStyle.Success);
      const stopButton = new ButtonBuilder()
        .setCustomId(`${server.identifier}-stop`)
        .setLabel("Stop")
        .setStyle(ButtonStyle.Danger);
      const killButton = new ButtonBuilder()
        .setCustomId(`${server.identifier}-kill`)
        .setLabel("Kill")
        .setStyle(ButtonStyle.Danger);
      const interfaceButton = new ButtonBuilder()
        .setLabel("Go to dashboard")
        .setURL("https://dash.illimity.fr")
        .setStyle(ButtonStyle.Link);

      const buttonRow = new ActionRowBuilder()
        .addComponents(startButton, restartButton, stopButton, killButton, interfaceButton);

      interaction.editReply({ content: "", embeds: [embed], components: [buttonRow] });
    });
  },
};
