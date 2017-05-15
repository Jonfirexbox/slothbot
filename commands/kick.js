exports.run = function (client, msg, args) {
    if (msg.mentions.users.size === 0) return msg.edit("Mention someone, dumfuck");

    msg.mentions.users.forEach(bye => {
        msg.guild.member(bye).kick();
    });
}