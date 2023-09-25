import { SlashCommandBuilder } from "discord.js";
import { PrismaClient } from "@prisma/client";

export default {
  data: new SlashCommandBuilder()
    .setName("safemode-config")
    .setDescription("Turn servers into safemode - Kill/Stop and backup servers")
    .addStringOption((option) =>
      option.setName("stop-list")
        .setDescription("List all server with identifer separate by a colon"),
    )
    .addStringOption((option) =>
      option.setName("kill-list")
        .setDescription("List all server with identifer separate by a colon"),
    )
    .addStringOption((option) =>
      option.setName("back-list")
        .setDescription("List all server with identifer separate by a colon"),
    ),
  async execute(interaction) {
    const prisma = new PrismaClient();
    const user = prisma.user.findUnique({ where: { discordId: interaction.member.id } });
    const stopList = interaction.options.get("stop-list")?.value ? JSON.stringify(interaction.options.get("stop-list").value) : null;
    const killList = interaction.options.get("kill-list")?.value ? JSON.stringify(interaction.options.get("stop-list").value) : null;
    const backupList = interaction.options.get("backup-list")?.value ? JSON.stringify(interaction.options.get("stop-list").value) : null;

    await prisma.safemode.upsert({
      where: { userId: user.discordId },
      create: {
        stopList: stopList,
        killList: killList,
        backupList: backupList,
      },
      update: {
        stopList: stopList,
        killList: killList,
        backupList: backupList,
      },
    });

    return interaction.reply({ content: "Your safemode has been saved!", ephemeral: true });
  },
};
