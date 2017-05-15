exports.run = function(client, msg, args) {
	if (msg.channel.type === 'dm') return msg.edit("**Unable to set nickname in a DM.**")
	if (!msg.member.hasPermission("CHANGE_NICKNAME")) return msg.edit("**Unable to set nickname: missing permissions**")

	let nickname = args[0] ? args.join(" ") : ""
	msg.guild.member(msg.author.id).setNickname(nickname).then(() => {
		msg.edit(`Nickname ${nickname === "" ? "cleared" : "set to **" + nickname + "**"}`)
	})
}
