import { Client, Message, TextChannel } from "discord.js";
const config = require("./settings.js");
const client = new Client(config.token);
const schedule = require("node-schedule");

const Tenor = require("tenorjs").client({
  Key: config.TenorToken, // https://tenor.com/developer/keyregistration
  Filter: "off", // "off", "low", "medium", "high", not case sensitive
  Locale: "de_DE", // Your locale here, case-sensitivity depends on input
  MediaFilter: "minimal", // either minimal or basic, not case sensitive
  DateFormat: "D/MM/YYYY - H:mm:ss A", // Change this accordingly
});

client.login(config.DisToken);

client.on("ready", () => {
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} | ${guild.id}`);
  });
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().includes("sex")) {
    message.reply("Bitte kein sex in der Nachricht beinhalten!");
    return;
  }

  if (message.content.includes("howmuch:")) {
    var howmany: number = Math.min(
      Math.max(parseInt(message.content.replace(/^\D+/g, "")), 1),
      5
    );
  }
  let searchquery = message.content.replace(/howmuch.*$/, "");

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

schedule.scheduleJob("0 * * * *", function () {
  Tenor.Search.Random("vomit puke", "2")
    .then((Results) => {
      Results.forEach((Post) => {
        (client.channels.cache.get("851892495482355753") as TextChannel)
          .send("Es ist zeit")
          .catch(console.error);
      });
    })
    .catch(console.error);
});

schedule.scheduleJob("30 * * * *", function () {
  Tenor.Search.Random("30", "1")
    .then((Results) => {
      Results.forEach((Post) => {
        (client.channels.cache.get("851892495482355753") as TextChannel)
          .send("30 Minuten bis zur zeit") 
          .catch(console.error);
        if (config.Verbose) console.log(`Half Hour responded with ${Post.url}`);
      });
    })
    .catch(console.error);
});

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Probably EAI_AGAIN error");
});
