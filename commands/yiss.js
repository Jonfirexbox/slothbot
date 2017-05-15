const gm = require('gm');
const path = require('path');
const Jimp = require('jimp');

exports.run = function(client, msg, args) {
	msg.edit(":gear: Generating... please wait.").then(() => {
		let shitText = args.join(" ").toLowerCase() || 'bread crumbs';
		try {
			gm()
			.command('convert')
			.font('./resources/awyiss/yiss.ttf')
			.rawSize(160, 30)
			.out('-background')
		    .out('transparent')
		    .fill('#000000')
		    .gravity('Center')
			.rotate('transparent', -2)
		    .out(`caption:${shitText}`)
		    .options({
				imageMagick: true
			}).toBuffer('PNG', async function(err, buf) {
				let text = await Jimp.read(buf);
				let img = await Jimp.read('./resources/awyiss/awyiss.jpg');
				img.composite(text, 409, 107);
				img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
					msg.delete()
					msg.channel.sendFile(buffer)
				})
			})
		}catch(e){
			console.log(e);
		}
	})
}
