const sf = require("snekfetch");
exports.run = async function(client, msg, args) {
	msg.delete()
	let cates = await sf.get("http://random.cat/meow");
	if (cates.status === 200)
		msg.channel.send({ files: [cates.body.file] });
}
