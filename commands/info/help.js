module.exports = {
    name: "help",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.reply("All commands are: (n.help), (n.hi) and (n.ping)")
    }
}