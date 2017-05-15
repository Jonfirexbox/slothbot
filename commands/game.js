exports.run = function(client, msg, args) {
	let game = args.join(" ")
	client.user.setGame(game).then(() => {
		msg.edit(`Game set to playing **${game}**`)
		.then(m => {
			m.delete(1000)
		})
	}).catch();
}
