let fs = require('fs')

exports.run = function(client, msg, args) {
	msg.edit("- Saving command -").then(() => {
		fs.writeFile("./commands/" + args[0] + ".js", args.slice(1).join(" "), (err) => {
			if (err) return msg.edit(":warning: Failed to save command: " + err)
			msg.edit("Saved command!")
		})
	})
}
