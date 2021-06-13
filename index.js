const discord = require('discord.js');
const config = require('./settings.json');
const client = new discord.Client();
const disbut = require('discord-buttons');
var schedule = require('node-schedule');
const Tenor = require("tenorjs").client({
	"Key": config.tenorkey, // https://tenor.com/developer/keyregistration
	"Filter": "off", // "off", "low", "medium", "high", not case sensitive
	"Locale": "de_DE", // Your locale here, case-sensitivity depends on input
	"MediaFilter": "minimal", // either minimal or basic, not case sensitive
	"DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

if (config.token == "Sus") {
	console.log("Please enter you Discord Token in the settings file")
	process.exit(0)
} else {
	client.login(config.token);
}

client.on("ready", () => {
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id}`);
	})
})

client.on('message', (message) => {
	if (message.author.bot) return;
	howmany = "1"
	searchquery = ""
	if (message.content.includes('howmuch:')) {
		howmany = message.content.replace(/^\D+/g, '');
	}
	searchquery = message.content.replace(/\howmuch:*/, '');
	howmany = Math.min(Math.max(parseInt(howmany), 1), 5);
	Tenor.Search.Random(searchquery, howmany).then(Results => {
		Results.forEach(Post => {
			client.channels.cache.get("851892495482355753").send(Post.url);
		});
	}).catch(console.error);
})

schedule.scheduleJob('0 * * * *', function () {
	Tenor.Search.Random("vomit puke", "1").then(Results => {
		Results.forEach(Post => {
			client.channels.cache.get("851892495482355753").send("Es ist zeit");
			client.channels.cache.get("851892495482355753").send(Post.url);
		});
	}).catch(console.error);
});