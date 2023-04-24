import { SlashCommandBuilder } from "discord.js";
import axios from "axios";

export default {
	data: new SlashCommandBuilder()
		.setName("create-backup")
		.setDescription("Create a new backup for a server")
		.addStringOption((option) =>
			option.setName("identifier")
				.setDescription("Your server identifier")
				.setRequired(true),
		),
	async execute(interaction) {
		const id = interaction.options.get("identifier").value;
		let response;
		try {
			response = await axios.post(`/servers/${id}/backups`);
		}
		catch (error) {
			console.log(error.response.data.errors);
			return interaction.reply({ content: error.response.data.errors[0].detail, ephemeral: true });
		}

		return interaction.reply(`Backup created successfuly with the name ${response.data.attributes.name}`);
	},
};
