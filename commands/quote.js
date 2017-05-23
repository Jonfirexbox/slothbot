const sf = require('snekfetch')

exports.run = async function(client, msg, args) {
	let data = await sf.get("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en");
	msg.edit('"*' + res.body.quoteText + '"*\n	~**' + res.body.quoteAuthor + "**")
}
