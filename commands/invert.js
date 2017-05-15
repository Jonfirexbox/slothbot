const Jimp = require('jimp');

exports.run = async function(client, msg, args) {
    await msg.edit(":gear: Generating... please wait.")
	try {
	    let img = await Jimp.read(msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL)
		img.invert()
	    img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
	        msg.delete()
	        msg.channel.sendFile(buffer)
	    })
	}catch(e){
		msg.edit(":warning: Failed to generate image\n" + e.message)
	}
}
