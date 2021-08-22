
module.exports = {
	DisToken: process.env.DisToken || "" || console.error("Enter Your Discord Token in the Settings file or create an Enviroment Variable called 'DisToken' !"),
	TenorToken: process.env.TenToken || "" || console.error("Enter Your Tenor Token in the Settings file or create an Enviroment Variable called 'TenorToken' !"),
	Verbose: process.env.VerboseLogging || false,
	sendgifs: process.env.SendGifs || false
};
