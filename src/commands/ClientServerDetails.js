const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fecthClientServerInfo = require("../functions/fetchClientServerInfo.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("client-server-details")
		.setDescription("Give all know details about the given server")
		.addStringOption((option) =>
			option.setName("server-id")
				.setDescription("Your server identifier")
				.setRequired(true),
		),
	async execute(interaction) {
		const server = await fecthClientServerInfo(interaction.options.get("server-id").value);
		console.log(server);

		const embed = new EmbedBuilder()
			.setTitle(server.name)
			.setDescription(server.description ? server.description : "No description...")
			.addFields(
				{ name: "Identifier", value: server.identifier, inline: true },
				{ name: "Status", value: server.stats.current_state, inline: true },
				{ name: "CPU", value: `${server.stats.resources.cpu_absolute}`, inline: true },
				{ name: "Memory", value: `${server.stats.resources.memory_bytes}`, inline: true },
				{ name: "Disk", value: `${server.stats.resources.disk_bytes}`, inline: true },
				{ name: "Uptime", value: `${server.stats.resources.uptime}`, inline: true },
			)
			.setColor("Blurple")
			.setTimestamp();

		return interaction.reply({ embeds: [embed] });
	},
};
