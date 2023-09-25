import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import postServerPower from "../functions/postServerPower.js";

export default {
  data: new SlashCommandBuilder()
    .setName("power")
    .setDescription("Provide a way to up or down a server")
    .addStringOption((option) =>
      option.setName("identifier")
        .setDescription("Your server identifier")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("state")
        .setDescription("Choose a state for your server")
        .setChoices(
          { name: "start", value: "start" },
          { name: "stop", value: "stop" },
          { name: "restart", value: "restart" },
          { name: "kill", value: "kill" },
        )
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    // TODO :  Add modal to select server and then launch interaction
    const state = interaction.options.get("state").value;
    const id = interaction.options.get("identifier").value;
    try {
      await postServerPower(id, state);
    }
    catch (error) {
      return interaction.reply({ content: error, ephemeral: true });
    }
    return interaction.reply(`**${state}** request as been sent to the server with success!`);
  },
};
