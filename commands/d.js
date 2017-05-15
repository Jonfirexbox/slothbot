exports.run = async function(client, msg, args) {
	let delamount = parseInt(args[0]) ? parseInt(args[0]) : 1;
	let msgs = await msg.channel.fetchMessages({limit: 100});
	msgs = msgs.array().filter(m => m.author.id === client.user.id)
	msgs.length = delamount + 1;
	msgs.forEach(m => m.delete());
}
