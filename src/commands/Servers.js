import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios from "axios";
import { config } from "dotenv";
config();

export default {
	data: new SlashCommandBuilder()
		.setName("servers")
		.setDescription("Show information about your servers"),
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
