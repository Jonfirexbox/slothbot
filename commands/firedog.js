const gm = require('gm');
const path = require('path');
const Jimp = require('jimp');

exports.run = function(client, msg, args) {
	msg.edit(":gear: Generating... please wait.").then(() => {
		let shitText = args.join(" ") || 'this is fine';
		try {
			gm()
			.command('convert')
			.font(path.join(__dirname, '..', 'resources/firedog/dkyellow.otf'))
			.rawSize(154, 40)
			.out('-background')
		    .out('transparent')
		    .fill('#000000')
		    .gravity('Center')
		    .out(`caption:${shitText}`)
		    .options({
				imageMagick: true
			}).toBuffer('PNG', async function(err, buf) {
				let text = await Jimp.read(buf);
				let img = await Jimp.read(path.join(__dirname, '..', 'resources/firedog', `blankdog.png`));
				img.composite(text, 354, 10);
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
