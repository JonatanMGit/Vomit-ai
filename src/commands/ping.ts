import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with the Roundtrip Time!"),
	execute: async (interaction: CommandInteraction) => {
		const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
		interaction.editReply(`Roundtrip latency: ${(sent as Message).createdTimestamp - interaction.createdTimestamp}ms`);
	},
};