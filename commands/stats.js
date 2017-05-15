exports.run = function(client, msg, args, settings, Discord) {
	let embed = new Discord.RichEmbed().setColor("#26a856")
	.addField(`${client.user.username}#${client.user.discriminator} (SBv${settings.version})`,
		`**Uptime:** ${getDur(process.uptime())}\n` +
		`**Ping:** ${client.ping.toFixed(0)}ms\n` +
		`**RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\n` +
		`**NodeJS:** ${process.version}`);
	msg.edit("", {embed: embed})
}

function getDur(time) {
    let days = Math.floor((time % 31536000) / 86400);
    let hours = Math.floor(((time % 31536000) % 86400) / 3600);
    let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
    let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60);
    days = days > 9  ? days : "0" + days
    hours = hours > 9 ? hours : "0" + hours
    minutes = minutes > 9 ? minutes : "0" + minutes
    seconds = seconds > 9 ? seconds : "0" + seconds
    return (parseInt(days) > 0 ? days + ":" : "") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + ":") + minutes + ":" + seconds
}
