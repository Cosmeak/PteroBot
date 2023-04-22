const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
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

		let message = "";
		response.data.data.forEach((server) => {
			message += server.attributes.name + " [" + server.attributes.identifier + "] \n";
		});

		const embed = new EmbedBuilder()
			.setTitle("All available servers")
			.setDescription(message)
			.setColor("Blurple")
			.setTitle();

		return interaction.reply({ embeds: [embed] });
	},
};
