import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mutevc")
		.setDescription("mutes fart bomb so")
		.addUserOption(option => option.setName("target").setDescription("Select a user").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("Enter a reason to mute a person").setRequired(false)),
	execute: async (interaction: CommandInteraction) => {
		if (interaction.inGuild() === true) { // if the command is ran in a guild
			const target = interaction.options.getUser("target");
			const reason = interaction.options.getString("reason");
			const member = interaction.member as GuildMember;
			if (reason === null) {
				await interaction.reply(target.username + " will be muted for no reason");
			} else {
				await interaction.reply(target.username + " will be muted for " + reason);
			}
			if (interaction.guild.members.cache.get(target.id).voice.serverMute === false) { // if the user is not muted

				if (interaction.guild.me.permissions.has("MUTE_MEMBERS") && member.permissions.has("MUTE_MEMBERS")) { // if the bot and the user have the permission to mute

					interaction.guild.members.cache.get(target.id).voice.setMute(true, reason);
					if (reason !== null) { // if the user has a reason
						await interaction.editReply(target.username + " has beeen muted for " + reason);
					} else { // if the user does not have a reason
						await interaction.editReply(target.username + " has been muted for no reason");
					}
				} else { // if the user does not have the permissions to mute
					await interaction.editReply("Failed to mute" + target.username + ", Maybe you  don't have permission to mute that person!");
				}

			} else { // if the user is already muted
				await interaction.editReply("Failed to mute" + target.username + ", Maybe they are already muted!");
			}
		} else { // if the command is ran in a DM
			await interaction.reply("You need to be in a Guild to use this Command!");
		}
	},
};