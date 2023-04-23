import { SlashCommandBuilder } from "discord.js";
// import axios from "axios";
// import { config } from "dotenv";
// config();

export default {
	data: new SlashCommandBuilder()
		.setName("send")
		.setDescription("Send a command to your server")
		.addStringOption((option) =>
			option.setName("server-id")
				.setDescription("Your server identifier")
				.setRequired(true),
		),
	async execute(interaction) {

	},
};
