exports.run = function(client, msg, args) {
    client.user.setAvatar(args.join(" ")).then(() => {
        msg.edit("Avatar set!")
        msg.delete(750)
    }).catch(() => {
        msg.edit("Failed to set avatar!")
    })
}
