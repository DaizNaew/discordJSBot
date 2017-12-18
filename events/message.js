const settings = require('../config.json');

const logging = require('../enum/logging');

module.exports = (message) => {

    const client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(settings.prefix)) return logging(message);
    const command = message.content.split(' ')[0].slice(settings.prefix.length);
    const params = message.content.split(' ').slice(1);

    //console.dir(message);
    
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        cmd.run(client, message, params);
        logging(message);
    }

    

};