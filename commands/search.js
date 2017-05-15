const request = require('superagent')

exports.run = function(client, msg, args, settings, Discord) {
	msg.edit("Searching, please wait...").then(() => {
		let url
		if (args[0].toLowerCase() === "image") {
			url = `https://www.googleapis.com/customsearch/v1?searchType=image&key=${settings.google.key}&cx=${settings.google.searchengine}&safe=medium&q=${args.join(" ")}`;
		} else {
			url = `https://www.googleapis.com/customsearch/v1?key=${settings.google.key}&cx=${settings.google.searchengine}&safe=medium&q=${args.join(" ")}`;
		}
		request.get(url).end((err, res) => {
			if (err) {
				console.log(err)
				return msg.edit("Failed to search Google");
			}
			if (res.body.queries.request[0].totalResults === '0') return msg.edit('`No results found!`');
			if (args[0].toLowerCase() === "image") {
				msg.edit(res.body.items[0].link).catch((e) => {
					msg.edit("Failed to search Google")
				})
			} else {
				let embed = new Discord.RichEmbed();
				embed.setColor("#26a856")
				.setTitle(res.body.items[0].title)
				.setURL(res.body.items[0].link)
				.setDescription(res.body.items[0].snippet)
				.setFooter("Searched on")
				.setTimestamp(new Date())
				msg.channel.sendEmbed(embed).then(() => {
					msg.delete()
				}).catch((e) => {
					msg.edit("Failed to search Google");
				})
			}
		});
	});
}
