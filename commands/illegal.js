const needle = require("needle")

exports.run = function(client, msg, args, settings, Discord) {
	msg.delete()
	let options = {
			headers: {"Api-Key": settings.keys.martmists}
	}
	needle.get("https://martmists.com/api/v2/illegal?query=" + args.join(" "), options, (err, res) => {
		msg.channel.sendFile(res.body, "illegal.gif")
	})
}
