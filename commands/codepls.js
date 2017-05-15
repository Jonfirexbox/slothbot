const beautify = require('js-beautify').js_beautify
let codeRegex = /```(?:js|json|javascript)?\n?((?:\n|.)+?)\n?```/ig;

exports.run = function(client, msg, args) {
	let messages = msg.channel.messages.array().reverse().filter(msg => msg.author.id !== client.user.id);
	let code;

	for (let m = 0; m < messages.length; m++) {
		let msg = messages[m];
		let groups = codeRegex.exec(msg.content);
		if (groups && groups[1].length) {
			code = groups[1];
			break;
		}
	}

	if (!code) {
		return msg.edit('No Javascript codeblock found.');
	}

	let beautifiedCode = beautify(code, { indent_size: 4, brace_style: 'collapse' });
	beautifiedCode = reduceIndentation(beautifiedCode);

	msg.edit(`${'```js'}\n${beautifiedCode}\n${'```'}`);
}

function reduceIndentation(txt) {
	let whitespace = txt.match(/^(\s+)/);
	if (!whitespace) return txt;
	whitespace = whitespace[0].replace('\n', '');
	let lines = txt.split('\n');
	let reformattedLines = [];
	lines.forEach(line => reformattedLines.push(line.replace(whitespace, '')));
	return reformattedLines.join('\n');
}
