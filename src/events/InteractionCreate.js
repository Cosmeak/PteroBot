import { Events } from "discord.js";
import { Logger } from "../services/Logger.js";
import postServerPower from "../functions/postServerPower.js";

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        Logger.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
      try {
        await command.execute(interaction);
      }
      catch (error) {
        Logger.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
        }
        else {
          await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
      }
    }
    else if (interaction.isButton()) {
      // TODO : Restrict interaction to server administrator
      const info = interaction.customId.split("-");
      await postServerPower(info[0], info[1]);
      await interaction.reply({ content: "Request send to the server.", ephemeral: true });
    }
  },
};
