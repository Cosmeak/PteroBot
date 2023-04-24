import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Show all available commands"),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle("Need some help?")
			.setDescription(`
				**PteroBot** give an access to control your server trough discord commands. \n
				**/servers** : List all your servers \n
				**/server {identifier}** : Show you informations about your server, like CPU, RAM, DISK utilization or Update \n
				**/power {identifer} {state}** : Provide you a way to change a server state (start, stop, kill or restart) \n
				**/backups {identifier}** : Show all your server backups \n
				**/create-backup {identifier}** : Create a new backup for your (within the limit of available backups) \n
				\n
				If you want to support bot development, please stars the github repository or contribute to it. https://github.com/Cosmeak/PteroBot
			`)
			.setTimestamp()
			.setColor("Blurple");
		return interaction.reply({ embeds: [embed] });
	},
};
