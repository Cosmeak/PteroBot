import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fecthClientServerInfo from "../functions/fetchClientServerInfo.js";
import capitalizeFirstLetter from "../functions/capitalizeFirstLetter.js";
import bytesToSize from "../functions/bytesToSize.js";
import convertMilliseconds from "../functions/convertMilliseconds.js";

export default {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Show informations about a server and control it")
		.addStringOption((option) =>
			option.setName("server-id")
				.setDescription("Your server identifier")
				.setRequired(true),
		),
	async execute(interaction) {
		const server = await fecthClientServerInfo(interaction.options.get("server-id").value);
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

		return interaction.reply({ embeds: [embed] });
	},
};
