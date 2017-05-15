exports.run = function(client, msg, args) {
    let text = args.join(" ").split("\n");
    msg.edit("```css\n" + text.map(t => ">" + t).join("\n") + "\n```");
}