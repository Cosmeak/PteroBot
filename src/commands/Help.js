import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Show all available commands"),
	async execute(interaction) {

	},
};
