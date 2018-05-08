        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {
    message.channel.send('https://www.youtube.com/watch?v=cAy4zULKFDU');
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'insult',
    description: "It's all true",
    usage: 'insult'
}