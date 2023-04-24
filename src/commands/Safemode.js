import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("safemode")
		.setDescription("Turn servers into safemode - Kill/Stop and backup servers"),
	async execute(interaction) {
		
	},
};
