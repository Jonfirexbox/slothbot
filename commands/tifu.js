const sf = require("snekfetch");

exports.run = async function(client, msg, args) {
    await msg.edit("Getting TIFU story...");

    let res = await sf.get("https://reddit.com/r/tifu.json").set("Accept-Encoding", "application/json");

    if (res.status !== 200)
        return msg.edit("Error fetching posts.");

    res = res.body.data.children.filter(c => c.data.link_flair_css_class && c.data.link_flair_css_class === "S");

    msg.edit(res.slice(2)[0].data.selftext)
}
