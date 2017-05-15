exports.run = function(client, msg, args) {
	let text = args.join(" ").replace(/a/gi, "ａ").replace(/b/gi, "ｂ").replace(/c/gi, "ｃ").replace(/d/gi, "ｄ").replace(/e/gi, "ｅ").replace(/f/gi, "ｆ").replace(/g/gi, "ｇ").replace(/h/gi, "ｈ").replace(/i/gi, "ｉ").replace(/j/gi, "ｊ").replace(/k/gi, "ｋ").replace(/l/gi, "ｌ").replace(/m/gi, "ｍ").replace(/n/gi, "ｎ").replace(/o/gi, "ｏ").replace(/p/gi, "ｐ").replace(/q/gi, "ｑ").replace(/r/gi, "ｒ").replace(/s/gi, "ｓ").replace(/t/gi, "ｔ").replace(/u/gi, "ｕ").replace(/v/gi, "ｖ").replace(/w/gi, "ｗ").replace(/x/gi, "ｘ").replace(/y/gi, "ｙ").replace(/z/gi, "ｚ")
	msg.edit("**" + text + "**")
}
