import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import postServerPower from "../functions/postServerPower.js";
import createNewServerBackup from "../functions/createNewServerBackup.js";

export default {
  data: new SlashCommandBuilder()
    .setName("safemode")
    .setDescription("Turn servers into safemode - Kill/Stop and backup servers")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {

    // TODO : import safemode config from config file
    const safemode = {};

    if (safemode.stopList) {
      JSON.parse(safemode.stopList).forEach(async (server) => {
        postServerPower(server, "stop");
      });
    }

    if (safemode.killList) {
      JSON.parse(safemode.killList).forEach(async (server) => {
        postServerPower(server, "kill");
      });
    }

    if (safemode.backupList) {
      JSON.parse(safemode.backupList).forEach(async (server) => {
        createNewServerBackup(server);
      });
    }

    return interaction.reply("Your servers are going into safemode");
  },
};
