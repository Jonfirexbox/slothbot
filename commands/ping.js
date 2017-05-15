exports.run = function(client, msg, args, settings, Discord) {
	let ping = args[0] ? args[0] : client.pings[0]
	ping = ping > 255 ? 255 : ping
	let rgb = [0 + ping, 255 - ping, 0]
	msg.edit("", {embed: new Discord.RichEmbed().setColor(rgb).setDescription(`:ping_pong: ${client.pings[0].toFixed(0)}ms`)}) //#26a856
}
