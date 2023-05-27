import { ActivityType, Client, Collection, GatewayIntentBits } from "discord.js";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "url";
import { Logger } from "./Logger.js";
import { config } from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Bot extends Client {
	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
			],
		});
	}

	async run() {
		// Log in to Discord with your token
		await this.login(process.env.BOT_TOKEN);
		this.user.setActivity("your servers 👀", { type: ActivityType.Watching });
		// Launch registration of all slash commands
		await this.registerCommands();
		// Launch registration of events
		await this.registerEvents();
	}

	async registerCommands() {
		// Create a new collection instance for commands
		this.commands = new Collection();
		const commandsPath = path.join(__dirname, "..", "commands");
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			let command = await import(filePath);
			command = command.default;
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if (command?.data && command?.execute) this.commands.set(command.data.name, command);
			else Logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

	async registerEvents() {
		const eventsPath = path.join(__dirname, "..", "events");
		const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

		for (const file of eventsFiles) {
			const filePath = path.join(eventsPath, file);
			let event = await import(filePath);
			event = event.default;
			if (event.once) this.once(event.name, (...args) => event.execute(...args));
			else this.on(event.name, (...args) => event.execute(...args));
		}
	}
}

export { Bot };
