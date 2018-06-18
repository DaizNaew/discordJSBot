        //Local Files
const   func = require('../func/propFunctions');

exports.run = (client, message, params, command_success) => {
    message.channel.send('You can donate to the cause by visiting my patreon at: https://www.patreon.com/user?u=2748417');
    message.react(command_success);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['support'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'donate',
    description: 'Links to places where to donate to the DBot cause',
    usage: 'donate'
}