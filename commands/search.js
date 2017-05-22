const sf = require('snekfetch');

exports.run = async function(client, msg, args, settings, Discord) {
	await msg.edit("Searching, please wait...");
	let url;
	if (args[0].toLowerCase() === "image")
		url = `https://www.googleapis.com/customsearch/v1?searchType=image&key=${settings.keys.google.key}&cx=${settings.keys.google.engineid}&safe=medium&q=${args.join(" ")}`;
	else
		url = `https://www.googleapis.com/customsearch/v1?key=${settings.keys.google.key}&cx=${settings.keys.google.engineid}&safe=medium&q=${args.join(" ")}`;

	let res = await sf.get(url).catch(err => { return err.message });

	if (!res.body)
		return msg.edit("Error searching Google\n" + resp);
	if (res.body.queries.request[0].totalResults === '0')
		return msg.edit("No results found.");

	if (args[0].toLowerCase() === "image")
		msg.edit(res.body.items[0].link);
	else
		msg.edit({ embed: {
			color: 0x26a856,
			title: res.body.items[0].title,
			url: res.body.items[0].link,
			description: res.body.items[0].snippet,
			footer: { text: "Search performed" },
			timestamp: new Date()
		}});
}
