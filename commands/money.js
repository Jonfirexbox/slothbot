const superagent = require("superagent");

exports.run = async function(client, msg, args) {

	let res = await superagent.get(`https://api.fixer.io/latest?base=${args[1]}`);
	if (!res || !res.body) return msg.edit("No conversion rates found.");

	let toRates = res.body.rates[args[2].toUpperCase()]
	msg.edit("", { embed: {
		color: 0x26a856,
		title: "Conversion",
		description: `${args[0]} ${args[1].toUpperCase()} -> ${(toRates * args[0]).toFixed(2)} ${args[2].toUpperCase()}`
	}})

}
