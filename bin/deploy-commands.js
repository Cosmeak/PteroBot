const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const logger = require("../src/services/Logger");
require("dotenv").config();

(async () => {
  const commands = [];
  const commandsPath = path.join(__dirname, "..", "src", "commands");
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
  try {
    logger.log(`Started refreshing ${commands.length} application (/) commands`);
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    logger.success(`Successfully reloaded ${data.length} application (/) commands.`);
  }
  catch (error) {
    logger.error(error);
  }
})();
