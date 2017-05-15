const util = require("util");

exports.run = function (client, msg, args, settings, Discord) {
    try {
        let rep = new RegExp(client.user.email + "|" + client.token, "gi");
        let code = eval(args.join(" "));
        if (typeof code === "string") code = code.replace(rep, "*");
        else code = util.inspect(code, {depth:0}).replace(rep, "*");
        msg.edit(args.join(" ") + "\n```js\n" + code + "\n```");
    }catch(e){
        msg.edit(args.join(" ") + "\n```js\n" + e.stack.split("\n")[0] + "\n```");
    }
}
