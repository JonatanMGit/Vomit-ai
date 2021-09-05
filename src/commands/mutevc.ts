import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mutevc")
		.setDescription("mutes fart bomb so")
		.addUserOption(option => option.setName("target").setDescription("Select a user").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("Enter a reason to mute a person").setRequired(false)),
	execute: async (interaction: CommandInteraction) => {
		if (interaction.inGuild() === true) {
			const target = interaction.options.getUser("target");
			const reason = interaction.options.getString("reason");
			const member = interaction.member as GuildMember;
			if (reason === null) {
				await interaction.reply(target.username + " will be muted for no reason");
			} else {
				await interaction.reply(target.username + " will be muted for " + reason);
			}

			if (interaction.guild.me.permissions.has("MUTE_MEMBERS") && member.permissions.has("MUTE_MEMBERS")) {
				interaction.guild.members.cache.get(target.id).voice.setMute(true);

				if (reason !== null) {
					await interaction.reply(target.username + " will be muted for " + reason);
				} else {
					await interaction.reply(target.username + " will be muted for no reason");
				}
				
			} else {

				await interaction.editReply("Failed to mute" + target.username + ", Maybe I or you don't have permission to mute that person!");
			}
		} else {
			await interaction.reply("You need to be in a Guild to use this Command!");
		}
	},
};