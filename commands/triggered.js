const Jimp = require('jimp');
const GIFEnc = require("gifencoder")

exports.run = async function(client, msg, args, undefined, Discord) {
	let frames = []
	let frameCount = 8
	let avatarURL = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL
	avatarURL = avatarURL.replace("gif", "png");
    await msg.edit(":gear: Generating... please wait.");

	let base = new Jimp(256, 256)
	let avatar = await Jimp.read(avatarURL);
	let text = await Jimp.read("./resources/triggered.jpg");
	let tint = await Jimp.read("./resources/red.png");
	avatar.resize(320, 320);
	tint.scaleToFit(base.bitmap.width, base.bitmap.height);
	tint.opacity(0.2);
	text.scaleToFit(280, 60);

	let buffers = [];
	let encoder = new GIFEnc(256, 256);
	let stream = encoder.createReadStream();
	let temp, x, y;

	stream.on("data", buffer => {
		buffers.push(buffer);
	})
	stream.on("end", () => {
		msg.delete();
		msg.channel.sendFile(Buffer.concat(buffers), "triggered.gif")
	})

	for (let i = 0; i < frameCount; i++) {
		temp = base.clone();
		if (i === 0) temp.composite(avatar, -16, -16);
		else temp.composite(avatar, -32 + (getRandomInt(-16, 16)), -32 + (getRandomInt(-16, 16)));

		if (i === 0) {
			x = -10;
			y = 200;
		} else {
			x = -12 + (getRandomInt(-8, 8));
			y = 200 + (getRandomInt(-0, 12));
		}
		temp.composite(tint, 0, 0);
		temp.composite(text, x, y);
		frames.push(temp.bitmap.data);
	}
	encoder.start();
	encoder.setRepeat(0);
	encoder.setDelay(20);
	for (let frame of frames) encoder.addFrame(frame);
	encoder.finish();

}

 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 };
