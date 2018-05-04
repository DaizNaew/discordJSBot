const m = require('chalk'),
      discord = require('discord.js'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions');

exports.run = (client, message, params, command_success, command_fail) => {
    message.channel.send('You can donate to the cause by visiting my patreon at: https://www.patreon.com/user?u=2748417');
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['support'],
    permLevel: 0
}

exports.help = {
    name: 'donate',
    description: 'Links to places where to donate to the DBot cause',
    usage: 'donate'
}