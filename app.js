const settings = require("./settings.json");
const fs = require('fs');
const Discord = require("discord.js")
const client = new Discord.Client();

client.login(settings.token);

fmls = { cache: [] };

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.username}`);
	if (!settings.reboot) return false;
	let m = await client.channels.get(settings.reboot.channel).fetchMessages({limit: 1, around: settings.reboot.msg})
	if (m && m.first()) m.first().react("\u2611");
	delete settings.reboot;
	fs.writeFileSync(`./settings.json`, JSON.stringify(settings, "", "\t"));
})

client.on('message', msg => {

	if (msg.mentions.users.has(client.user.id))
		fs.appendFileSync("./log.txt", `${new Date().toLocaleString()} [${msg.guild ? msg.guild.name : "DM"}] ${msg.author.username}#${msg.author.discriminator} > ${msg.content}\r\n\r\n`)

	if (msg.channel.type === "dm" && msg.author.id !== client.user.id)
		fs.appendFileSync("./dm.txt", `${new Date().toLocaleString()} [${msg.author.username}] ${msg.content}\r\n\r\n`);

	if (msg.author.id !== client.user.id) return false;

	if (msg.content.includes("shrug"))
		msg.edit(msg.content.replace(/shrug/g, "¯\\_(ツ)_/¯"));

	if (!msg.content.toLowerCase().startsWith(settings.prefix)) return false;

	const command = msg.content.toLowerCase().substring(settings.prefix.length).split(" ")[0];
	const args = msg.content.split(" ").slice(1);

	if (command === "cmds") {
		let commands = fs.readdirSync("./commands/")
		msg.edit({ embed: { color: 0x26a856, title: `Commands (${commands.length})`, description: commands.join(", ").replace(/\.js/gi, "") }});
	} else {
		if (!fs.existsSync("./commands/" + command + ".js")) return false;
		try {
			delete require.cache[require.resolve("./commands/" + command)];
			require("./commands/" + command).run(client, msg, args, settings, Discord, fmls);
		}catch(e){
			console.log(e)
			msg.edit({ embed: { color: 0x26a856, title: e.stack.split("\n")[0], description: e.message + "\n" + e.stack.split("\n")[1] }});
		}
	}
})
