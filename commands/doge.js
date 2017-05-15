const sf = require('snekfetch');
exports.run = async function (client, msg, args) {
    msg.delete()
    let doges = await sf.get("http://random.dog/woof");
    if (doges.status === 200)
        msg.channel.send({ files: [`http://random.dog/${doges.body}`] });
}
