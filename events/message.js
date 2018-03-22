const   logging = require('../enum/logging'),
        m = require('chalk'),
        log = require('../enum/consoleLogging');

module.exports = (message) => {
    const settings = require('../config.json');

    const client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(settings.prefix)) return logging(message);
    const command = message.content.split(' ')[0].slice(settings.prefix.length);
    const params = message.content.split(' ').slice(1);

    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if(cmd.conf.guildOnly && !message.guild) return message.author.send('This command only works in a server');
        cmd.run(client, message, params);
        let guildName = ``;
        let channelName = `a private message`;
        if(message.guild) guildName = `on ${m.cyan.bold(message.guild.name)}`;
        if(message.channel.name) channelName = message.channel.name;
        log(`${m.cyan.bold(cmd.help.name)} command used by ${m.cyan.bold(message.author.tag)} in ${m.cyan.bold(channelName)} ${guildName}`);
        logging(message);
    }
};