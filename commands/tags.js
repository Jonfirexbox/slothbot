const fs = require('fs')

exports.run = async function(client, msg, args, settings, Discord) {
    delete require.cache[require.resolve("../tags.json")]
    let tags = require('../tags.json')

	if (args[0] === "edit") {
		if (!tags[args[1]]) return msg.edit("Tag doesn't exist!")
		tags[args[1]] = args.slice(2).join(" ")
		let res = await updateTags(tags);
		res ? msg.edit("Tag database updated success") : msg.edit("Tag database updated failed")
		msg.delete(750)

	} else if (args[0] === "add") {
		let tagAdd = args[1]
		if (tags[tagAdd]) return msg.edit("That tag already exists!")
		tags[tagAdd] = args.slice(2).join(" ")
		let res = await updateTags(tags);
		res ? msg.edit("Tag database updated success") : msg.edit("Tag database updated failed")
		msg.delete(750)

	} else if (args[0] === "delete") {
		if (!tags[args[1]]) return msg.edit("Tag doesn't exist!")
		delete tags[args[1]]
		let res = await updateTags(tags);
		res ? msg.edit("Tag database updated success") : msg.edit("Tag database updated failed")
		msg.delete(750)

	} else if (args[0] === "src") {
		if (!tags[args[1]]) return msg.edit("Tag doesn't exist!")
		msg.edit(`Tag Content: **${args[1]}**\n${tags[args[1]]}`)

	} else if (tags[args[0]]) {
		let tag = tags[args[0]];
		if (["jpg", "gif", "png", "bmp"].includes(tag.substring(tag.length - 3)) && (msg.channel.type === 'dm' || msg.channel.permissionsFor(msg.member).hasPermission("ATTACH_FILES"))) {
			msg.delete();
			msg.channel.sendFile(tag)
		} else {
			msg.edit(tag)
		}
	} else {
		let tagarr = Object.keys(tags).map(key => key)
		msg.edit("", {embed:
			new Discord.RichEmbed()
			.setColor('#26a856')
			.setAuthor(client.user.tag, client.user.avatarURL)
			.setTitle(`Tags (${tagarr.length} total)`)
			.setDescription(tagarr.sort().join(", "))
			.setTimestamp(new Date())
			.setFooter("SelfBot Tags")
		});
	}
}

function updateTags(tag) {
    return new Promise((res, rej) => {
        fs.writeFile("./tags.json", JSON.stringify(tag, "", "\t"), err => {
            if (err) rej();
            else res("Success");
        });
    });
}
