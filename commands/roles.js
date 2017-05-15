exports.run = function(client, msg, args) {
	msg.edit(`\`\`\`\n${msg.guild.roles.sort((a, b) => { return b.position - a.position }).map(role => role.name).join("\n")}\n\`\`\``)
}
