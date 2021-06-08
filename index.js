const discord = require('discord.js');
const config = require('./settings.json');
const client = new discord.Client();
const disbut = require('discord-buttons');

if (config.token == "Sus") {
	console.log("Please enter you Discord Token in the settings file")
	process.exit(0)
} else {
	client.login(config.token);
}

client.channels.cache.get("851892495482355753").send("vomit")