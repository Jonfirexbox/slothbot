exports.run = function(client, msg, args) {
	let number = parseInt(args[0])
	let days = 0, hours = days, minutes = days, seconds = days
	days = Math.floor(number / 86400000);
	number -= days * 86400000
	hours = Math.floor(number / 3600000);
	number -= hours * 3600000
	minutes = Math.floor(number / 60000);
	number -= minutes * 60000
	seconds = Math.floor(number / 1000);
	number -= seconds * 1000
	msg.edit(`**Converting**: ${parseInt(args[0])} milliseconds\n**Result**: ${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)`)
}
