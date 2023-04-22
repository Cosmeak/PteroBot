const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const Logger = require("../services/Logger");
require("dotenv").config();

module.exports = class Bot {
	constructor() {
		// Set bot token
		this.token = process.env.BOT_TOKEN;
		// Create a new client instance
		this.client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildModeration,
				// GatewayIntentBits.GuildEmojisAndStickers,
				// GatewayIntentBits.GuildIntegrations,
				// GatewayIntentBits.GuildWebhooks,
				// GatewayIntentBits.GuildInvites,
				// GatewayIntentBits.GuildVoiceStates,
				// GatewayIntentBits.GuildPresences,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageReactions,
				// GatewayIntentBits.GuildMessageTyping,
				// GatewayIntentBits.DirectMessages,
				// GatewayIntentBits.DirectMessageReactions,
				// GatewayIntentBits.DirectMessageTyping,
				// GatewayIntentBits.MessageContent,
				// GatewayIntentBits.GuildScheduledEvents,
				// GatewayIntentBits.AutoModerationConfiguration,
				// GatewayIntentBits.AutoModerationExecution,
			],
		});
	}

	run() {
		// Log in to Discord with your token
		this.client.login(this.token);
		// Launch registration of all slash commands
		this.registerCommands();
		// Launch registration of events
		this.registerEvents();
	}

	registerCommands() {
		// Create a new collection instance for commands
		this.client.commands = new Collection();
		const commandsPath = path.join(__dirname, "..", "commands");
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if (command?.data && command?.execute) this.client.commands.set(command.data.name, command);
			else Logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

	registerEvents() {
		const eventsPath = path.join(__dirname, "..", "events");
		const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));
		for (const file of eventsFiles) {
			const filePath = path.join(eventsPath, file);
			const event = require(filePath);
			if (event.once) this.client.once(event.name, (...args) => event.execute(...args));
			else this.client.on(event.name, (...args) => event.execute(...args));
		}
	}
};
