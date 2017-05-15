const fs = require('fs');
const download = require('download');

exports.run = function(client, msg, args) {
    if (!args[0] || !args[1]) return msg.edit("Missing required arg(s)!");
    msg.edit(":gear: Downloading... please wait.").then(() => {
        download(args[0]).then(data => {
            fs.writeFileSync(args[1], data);
            msg.edit(`:inbox_tray: Downloaded to ${args[1]}`)
        }).catch((e) => {
            msg.edit(`:x: Failed to download: ${e}`)
        })
    })
}
