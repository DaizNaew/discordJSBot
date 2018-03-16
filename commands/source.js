const Discord = require('discord.js'),
      log = require('../enum/consoleLogging'),
      m = require('chalk');

exports.run = (client, message) => {

    message.channel.send("Fetching Sources...")
    .then(msg => {

        msg.edit(`Source can be found on my github over at: https://github.com/DaizNaew/discordJSBot`);
        log(`Source command used by ${m.cyan.bold(message.author.tag)} in ${m.cyan.bold(message.channel.name)} on ${m.cyan.bold(message.guild.name)}`);
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Source command failed to execute [${error}]`);
    });
}

exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['Source', 'Github', 'github'],
   permLevel: 0
}

exports.help = {
   name: 'source',
   description: 'Gives a link to the source of this bot',
   usage: 'source'
}
