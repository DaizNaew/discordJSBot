        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {
    if(!params[0]) return message.channel.send('I could not count any words to clap for');
    let input = params.slice(0).join(":clap:");
    message.channel.send('Counting words...')
    .then(msg => {
        message.delete();
        msg.edit(input)
    })
    .catch(err => {
        log.error(err);
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'clapsay',
    description: 'Outputs a say in an anoying fashion',
    usage: 'clapsay <input>'
}