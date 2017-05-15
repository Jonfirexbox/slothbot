const flip = require("flip")

exports.run = function(client, msg, args) {
	let flipped = flip(args.join(" "));
	msg.edit(flipped);
}
