exports.run = function(client, msg, args, settings, Discord) {
	const replyText = args.slice(1).join(" ");
	if (args[0] === "last") {
		msg.channel.fetchMessages({limit: 2}).then(mg => {
			let rep = mg.array()[1];
			let embed = new Discord.RichEmbed().setColor('#26a856')
			.setAuthor(`${rep.author.username}#${rep.author.discriminator}`, `${rep.author.avatarURL}`)
			.setDescription(rep.content)
			.setTimestamp(new Date(rep.createdTimestamp));
			msg.edit(replyText, {embed: embed});
		}).catch((e) => {
			console.log(e);
			return msg.edit("Failed to retrieve messages!")
		});
	} else if (!isNaN(args[0])) {
		msg.channel.fetchMessages({limit: 1, around: args[0]}).then(mg => {
			let rep = mg.first();
			let embed = new Discord.RichEmbed().setColor('#26a856')
			.setAuthor(`${rep.author.username}#${rep.author.discriminator}`, `${rep.author.avatarURL}`)
			.setDescription(rep.content)
			.setTimestamp(new Date(rep.createdTimestamp));
			msg.edit(replyText, {embed: embed});
		}).catch((e) => {
			console.log(e);
			return msg.edit("Failed to retrieve messages!")
		});
	} else {
		let usr = client.users.find("username", args[0])
		if (!usr) return msg.edit("User not found.\nAvailable quote args: `last`, `msgid`, `username`");
		msg.channel.fetchMessages({limit: 100}).then(messages => {
			let rep = messages.array();
			rep = rep.filter(m => m.author.id === usr.id)[0]
			let embed = new Discord.RichEmbed().setColor('#26a856')
			.setAuthor(`${rep.author.username}#${rep.author.discriminator}`, `${rep.author.avatarURL}`)
			.setDescription(rep.content)
			.setTimestamp(new Date(rep.createdTimestamp));
			msg.edit(replyText, {embed: embed});
		}).catch((e) => {
			console.log(e);
			return msg.edit("Failed to retrieve messages!")
		});
	}
}
