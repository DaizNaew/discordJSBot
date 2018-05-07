        //Local Files
const   log = require('../enum/consoleLogging'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {
    message.channel.send('Googling...')
    .then(msg => {
        let input = params.slice(0).join("+");
        const link = `http://lmgtfy.com/?q=${input}`;
        msg.edit(link);
        message.react(command_success);
    })
    .catch( error => {
        log.error(error); 
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'lmgtfy',
    description: 'How about we google that for you, instead of asking randomly',
    usage: 'lmgtfy <param>'
}