const sf      = require("snekfetch");
const cheerio = require('cheerio');

exports.run = async function(client, msg, args) {
	if (fml.cache.length >= 2) { // use cache for SPEEEED
		msg.edit(fml.cache[0]);
		fml.cache.shift();
	} else {
		let res = await sf.get("https://www.fmylife.com/random");
		if (!res || !res.text) return msg.edit("Failed to retrieve article.");

		let parsed = await cheerio.load(res.text, { normalizeWhitespace: true });
		let article = parsed("article p.block a")

		for (let i = 0; i < article.length; i++) {
			if (!article[i].children[0].data || article[i].children[0].data.length <= 5 || fml.cache.includes(article[i].children[0].data)) continue;
			fml.cache.push(article[i].children[0].data)
		}

		msg.edit(fml.cache[0])
		fml.cache.shift();
	}

}
