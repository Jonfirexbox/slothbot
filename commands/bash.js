const sf   = require("snekfetch");
const bash = require("child_process");

exports.run = function(client, msg, args, undefined, Discord) {
	if (!args[0]) return msg.edit("No arguments passed");

	msg.edit("❯_ " + args.join(" "))
	bash.exec(`${args.join(" ")}`, {shell : '/bin/bash' }, async (e, stdout, stderr) => {
		if (stdout.length > 2000 || stderr.length > 2000) {
			let resp = await sf.post("https://hastebin.com/documents").send(`${stdout}\n\n${stderr}`).catch(e => { return e.message });
			if (resp.status === 200)
				msg.channel.send({ embed: { color: 0x26a856, title: "Click to view output", url: `https://hastebin.com/${resp.body.key}`}});
			else
				msg.channel.send({ embed: { color: 0x26a856, title: "Post to Hastebin failed", description: resp.statusText }});
		} else {
			stdout && msg.channel.send("**Info**\n```js\n" + stdout + "```");
			stderr && msg.channel.send("**Errors**\n```js\n" + stderr + "```");
		}
	});
}
