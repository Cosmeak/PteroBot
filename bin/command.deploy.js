import { REST, Routes } from "discord.js";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { config } from "dotenv";
config();

(async () => {
	const commands = [];
	const commandsPath = path.join(__dirname, "..", "src", "commands");
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = await import(filePath);
		if (command.default?.data && command.default?.execute) {
			commands.push(command.default.data.toJSON());
		}
	}
	const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands`);
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.error(error);
	}
})();
