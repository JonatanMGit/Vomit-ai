const discord = require('discord.js');
const config = require('./settings.js');
const client = new discord.Client();
const disbut = require('discord-buttons');
var schedule = require('node-schedule');

const Tenor = require("tenorjs").client({
	"Key": config.TenorToken, // https://tenor.com/developer/keyregistration
	"Filter": "off", // "off", "low", "medium", "high", not case sensitive
	"Locale": "de_DE", // Your locale here, case-sensitivity depends on input
	"MediaFilter": "minimal", // either minimal or basic, not case sensitive
	"DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

client.login(config.DisToken)

client.on("ready", () => {
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id}`);
	})
})

client.on('message', (message) => {
	if (message.author.bot) return;
	if (message.content.includes("sex")) {
		message.reply("Bitte kein sex in der Nachricht beinhalten!")
		return
	}
	howmany = "1"
	searchquery = ""
	if (message.content.includes('howmuch:')) {
		howmany = message.content.replace(/^\D+/g, '');
	}
	searchquery = message.content.replace(/howmuch.*$/, '');
	howmany = Math.min(Math.max(parseInt(howmany), 1), 5);
	Tenor.Search.Random(searchquery, howmany).then(Results => {
		Results.forEach(Post => {
			client.channels.cache.get("851892495482355753").send(Post.url);
			if (config.Verbose) console.log(`Query ${searchquery} responded with ${Post.url}`);
		});
	}).catch(console.error);
})

schedule.scheduleJob('0 * * * *', function () {
	Tenor.Search.Random("vomit puke", "2").then(Results => {
		client.channels.cache.get("851892495482355753").send("Es ist zeit");
		Results.forEach(Post => {
			client.channels.cache.get("851892495482355753").send(Post.url);
			if (config.Verbose) console.log(`Full Hour responded with ${Post.url}`);
		});
	}).catch(console.error);
});

schedule.scheduleJob('30 * * * *', function () {
	Tenor.Search.Random("30", "1").then(Results => {
		client.channels.cache.get("851892495482355753").send("30 Minuten bis zur zeit");
		Results.forEach(Post => {
			client.channels.cache.get("851892495482355753").send(Post.url);
			if (config.Verbose) console.log(`Half Hour responded with ${Post.url}`);
		});
	}).catch(console.error);
});