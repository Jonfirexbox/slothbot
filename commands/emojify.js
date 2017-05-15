let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let numerical = "1234567890"

exports.run = function(client, msg, args) {
	let fn = "";
	let word = args.join(" ").toLowerCase()
	for(let i = 0; i < word.length; i++) {
		if (isNaN(word[i]) && alphabet.includes(word[i])) {
			fn += `:regional_indicator_${word[i]}:`;
		} else if (!isNaN(word[i]) && numerical.includes(word[i])) {
			fn += `:${numbers[word[i]]}:`
		} else {
			fn += word[i]
		}
	}
	fn = fn.replace(/\?/g, ":grey_question:").replace(/\!/g, ":grey_exclamation:")
	msg.edit(fn)
}
