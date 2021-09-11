const DisToken = "";
const TenorToken = "";

if (DisToken === "") {
	console.error("DisToken is not set");
	process.exit(1);
}
if (TenorToken === "") {
	console.error("TenorToken is not set");
	process.exit(1);
}

export = {
	DisToken: process.env.DisToken || DisToken,
	TenorToken: process.env.TenToken || TenorToken,
	Verbose: Boolean(process.env.VerboseLogging) || false,
	sendgifs: Boolean(process.env.SendGifs) || false
};
