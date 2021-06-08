const discord = require('discord.js');
const config = require('./settings.json');
const client = new discord.Client();
const disbut = require('discord-buttons');
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




client.on('message', (message) => {
	Tenor.Search.Query(message.content, "1").then(Results => {
		if (message.author.bot) return;
		Results.forEach(Post => {
			client.channels.cache.get("851892495482355753").send(`${Post.url}`);
		});
	}).catch(console.error);
})