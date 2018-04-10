const   logging = require('../enum/logging'),
        m = require('chalk'),
        log = require('../enum/consoleLogging');

module.exports = (message) => {
    const serverSettings = require('../config/serverSettings.json')[message.guild.id];
    const client = message.client;

    var command_success = client.emojis.find("name", "white_check_mark");
    var command_fail = client.emojis.find("name", "negative_squared_cross_mark");

    if(client.emojis.find("name", "command_successful")) command_success = client.emojis.find("name", "command_successful");
    if(client.emojis.find("name", "command_failed")) command_fail = client.emojis.find("name", "command_failed");

    if (message.author.bot) return;
    if (!message.content.startsWith(serverSettings['configs'][0].prefix)) return logging(message);
    const command = message.content.split(' ')[0].slice(serverSettings['configs'][0].prefix.length).toLowerCase();
    const params = message.content.split(' ').slice(1);

    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if(!serverSettings['commands'][cmd.help.name][0].enabled) return;
        if(cmd.conf.guildOnly && !message.guild) return message.author.send('This command only works in a server');
        if(serverSettings['commands'][cmd.help.name][0].permLevel > 0) {message.react('🔒');return message.channel.send('You do not have the permissions to do this')}
        cmd.run(client, message, params, command_success, command_fail);
        let guildName = ``;
        let channelName = `a private message`;
        if(message.guild) guildName = `on ${m.cyan.bold(message.guild.name)}`;
        if(message.channel.name) channelName = message.channel.name;
        log(`${m.cyan.bold(cmd.help.name)} command used by ${m.cyan.bold(message.author.tag)} in ${m.cyan.bold(channelName)} ${guildName}`);
        logging(message);
        //message.react(command_success);
    }
};