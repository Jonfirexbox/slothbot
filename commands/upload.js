const fs = require('fs')

exports.run = function(client, msg, args, undefined, Discord) {
	let path = args.join(" ");
	msg.delete()
	if (!path.includes("http://") && !path.includes("https://")) {
		if (!fs.existsSync(path)) return msg.channel.sendEmbed(new Discord.RichEmbed().setColor("#26a856").setTitle(":warning: File not found"))
		msg.channel.sendFile(path)
	} else {
		msg.channel.sendFile(path).catch(e => {
			msg.channel.sendEmbed(new Discord.RichEmbed().setColor("#26a856").setTitle(":warning: File not found"))
		})
	}
}
