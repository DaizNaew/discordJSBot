const   settings = require('../config.json'),
        logging = require('../enum/logging');

module.exports = (message) => {

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
        logging(message);
    }
};