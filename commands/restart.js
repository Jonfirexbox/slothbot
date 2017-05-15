const fs = require('fs')

exports.run = function(client, msg, args, settings) {

	settings["reboot"] = { "channel" : msg.channel.id, "msg" : msg.id };
	fs.writeFileSync("./settings.json", JSON.stringify(settings, "", "\t"));
	msg.edit("Restarting...").then(() => process.exit());

}
