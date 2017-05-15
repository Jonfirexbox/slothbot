exports.run = function (client, msg, args) {

	if (args[0] === "enc") {
    	msg.edit(new Buffer(args.slice(1).join(" ")).toString("base64"))
	}

	if (args[0] === "dec") {
		msg.edit(Buffer.from(args.slice(1).join(" "), "base64").toString("utf8"))
	}
}
