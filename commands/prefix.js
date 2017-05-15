const fs = require('fs')

exports.run = async function(client, msg, args, settings) {
	if (!args[0]) {
		await msg.edit("Specify a prefix");
		msg.delete(750)
	}
	settings.prefix = args[0]
	fs.writeFileSync("./settings.json", JSON.stringify(settings, "", "\t"), 'utf8')
	await msg.edit("Prefix updated!")
	msg.delete(750)
}
