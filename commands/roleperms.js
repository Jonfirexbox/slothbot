exports.run = function(client, msg, args) {
	let parsed = args.join(" ")
	let noDisabled = parsed.includes("--no-disabled")
	if (noDisabled) parsed = parsed.replace("--no-disabled", "").trim()
	let role = msg.guild.roles.find("name", parsed)
	if (!role) return msg.edit(`Role '**${parsed}**' not found!`);
	let roleperms = role.serialize()
	msg.channel.sendCode("diff",
		Object.keys(roleperms).map(p => roleperms[p] ? `+${p}` : (!noDisabled ? `-${p}` : ``)).sort().join("\n")
	)
	//msg.edit(`**Permissions for role**: ${role.name}\n\`\`\`xl\n${json}\n\`\`\``)
}
