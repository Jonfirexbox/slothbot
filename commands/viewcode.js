exports.run = function(client, msg, args) {
	if (!args[0]) return msg.channel.sendMessage("No module specified");

	try{
		let mdl = require(`${args[0].startsWith(".") ? args[0] : "./" + args[0]}`)
		msg.delete(25)
		msg.channel.sendCode("js", mdl.run)
	}catch(e){
		msg.edit("Module doesn't exist!")
	}
}
