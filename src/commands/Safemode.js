import { SlashCommandBuilder } from "discord.js";
import { PrismaClient } from "@prisma/client";
import postServerPower from "../functions/postServerPower.js";
import createNewServerBackup from "../functions/createNewServerBackup.js";

export default {
  data: new SlashCommandBuilder()
    .setName("safemode")
    .setDescription("Turn servers into safemode - Kill/Stop and backup servers"),
  async execute(interaction) {
    const prisma = new PrismaClient();
    const user = prisma.user.findUnique({
      where: { discordId: interaction.member.id },
      include: { safemode: true },
    });

    if (user.safemode.stopList) {
      JSON.parse(user.safemode.stopList).forEach(async (server) => {
        postServerPower(server, "stop");
      });
    }

    if (user.safemode.killList) {
      JSON.parse(user.safemode.killList).forEach(async (server) => {
        postServerPower(server, "kill");
      });
    }

    if (user.safemode.backupList) {
      JSON.parse(user.safemode.backupList).forEach(async (server) => {
        createNewServerBackup(server);
      });
    }

    return interaction.reply("Your servers are going into safemode");
  },
};
