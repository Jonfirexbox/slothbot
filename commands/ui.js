exports.run = async function(client, msg, args) {

	msg = await msg.edit("", { embed: { color: 0x26a856, description: "Fetching users..." }});

	let user;

	if (msg.mentions.users.size > 0) user = msg.mentions.users.first();
	else if (args[0]) parseInt(args[0]) ? user = client.users.get(args[0]) : user = client.users.find("username", args.join(" ").replace("-shared", ""));
	else user = msg.author;

	if (!user) return msg.edit("", { embed: { color: 0x26a856, description: "No users found. "}});

	if (args[1] === "-shared") {
		return msg.channel.sendMessage("", { embed: {
			color: 0x26a856,
			title: `Servers Shared with ${user.tag}`,
			description: client.guilds.filter(g => g.members.has(user.id)).map(g => g.name).join("\n")
		}})
	}

	let usp = await user.fetchProfile().catch(err => {});

	let embed = {
		color: 0x26a856,
		author: {
			name: user.tag,
			icon_url: user.displayAvatarURL
		},
		description: user.id,
		fields: [
			{ name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
			{ name: "Playing", value: user.presence.game ? user.presence.game.name : "Unknown", inline: true },
			{ name: "Nitro", value: (!user.bot && usp && usp.premiumSince) ? "Yes" : "No", inline: true },
		],
		footer: {
			text: `Created ${user.createdAt.toString()}`
		}
	};

	if (msg.guild && msg.guild.members.has(user.id)) embed.fields.push({ name: "Joined", value: msg.guild.member(user).joinedAt.toString(), inline: false });
	msg.edit("", {embed: embed})
}
