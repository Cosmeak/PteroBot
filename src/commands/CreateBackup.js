import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import fecthClientServerInfo from "../functions/fetchClientServerInfo.js";
// import axios from "axios";

export default {
	data: new SlashCommandBuilder()
		.setName("create-backup")
		.setDescription("Create a new backup for a server")
		.addStringOption((option) =>
			option.setName("server-id")
				.setDescription("Your server identifier")
				.setRequired(true),
		),
	async execute(interaction) {
		const serverId = interaction.options.get("server-id").value;
		const server = await fecthClientServerInfo(serverId);
		const embed = new EmbedBuilder()
			.setTitle(`Server: ${server.name}`)
			.setDescription("New embed for a serve")
			.setColor("Blurple")
			.setTimestamp();

		return interaction.reply({ embeds: [embed] });
	},
};
