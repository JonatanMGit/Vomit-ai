/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Intents, TextChannel} from "discord.js";
import schedule = require("node-schedule");
const config = require("./settings.ts");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const Tenor = require("tenorjs").client({
	Key: config.TenorToken, // https://tenor.com/developer/keyregistration
	Filter: "off", // "off", "low", "medium", "high", not case sensitive
	Locale: "de_DE", // Your locale here, case-sensitivity depends on input
	MediaFilter: "basic", // either minimal or basic, not case sensitive
	DateFormat: "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

const commands = [];
const commandFiles = fs.readdirSync("src/commands").filter(file => file.endsWith(".ts"));


const clientId = "851889838177255444";
const guildId = "779357485927759922";


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.DisToken);

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();


client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === "ping") {
		await interaction.reply("Pong!");
	}
});

client.login(config.DisToken);

client.on("ready", () => {
	client.guilds.cache.forEach((guild) => {
		console.log(`${guild.name} | ${guild.id}`);
	});
});

client.on("messageCreate", (message) => {
	if (message.author.bot) return;
	if (message.content.toLowerCase().includes("sex")) {
		message.reply("Bitte kein sex in der Nachricht beinhalten!");
		return;
	}

	let howmany = 1;
	if (message.content.includes("howmuch:")) {
		howmany = Math.min(
			Math.max(parseInt(message.content.replace(/^\D+/g, "")), 1),5);
	}
	const searchquery = message.content.replace(/howmuch.*$/, "");

	Tenor.Search.Random(searchquery, howmany)
		.then((Results) => {
			Results.forEach((Post) => {
				(client.channels.cache.get("851892495482355753") as TextChannel)
					.send(Post.url)
					.catch(console.error);
				if (config.Verbose)
					console.log(`Query ${searchquery} responded with ${Post.url}`);
			});
		})
		.catch(console.error);
});

if (config.sendgifs) {
	schedule.scheduleJob("0 * * * *", function () {
		(client.channels.cache.get("851892495482355753") as TextChannel)
			.send("Es ist zeit")
			.catch(console.error);
		Tenor.Search.Random("vomit puke", "2")
			.then((Results) => {
				Results.forEach((Post) => {
					(client.channels.cache.get("851892495482355753") as TextChannel)
						.send(Post.url)
						.catch(console.error);
					if (config.Verbose) console.log(`Full Hour responded with ${Post.url}`);
				});
			})
			.catch(console.error);
	});

	schedule.scheduleJob("30 * * * *", function () {
		(client.channels.cache.get("851892495482355753") as TextChannel)
			.send("30 Minuten bis zur zeit")
			.catch(console.error);
		Tenor.Search.Random("30", "1")
			.then((Results) => {
				Results.forEach((Post) => {
					(client.channels.cache.get("851892495482355753") as TextChannel)
						.send(Post.url)
						.catch(console.error);
					if (config.Verbose) console.log(`Half Hour responded with ${Post.url}`);
				});
			})
			.catch(console.error);
	});

	process.on("uncaughtException", function (err) {
		console.log("An Error has occured!");
		console.error(err);
	});
}