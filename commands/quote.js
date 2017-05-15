const request = require('superagent')

exports.run = function(client, msg, args) {
	request.get("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en").end((err, res) => {
		if (err) return msg.edit(err);
		msg.edit('"*' + res.body.quoteText + '"*\n	~**' + res.body.quoteAuthor + "**")
	})
}
