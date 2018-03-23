        //Local files
const log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("Fetching Sources...")
    .then(msg => {
        msg.edit(`Source can be found on my github over at: https://github.com/DaizNaew/discordJSBot`);
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
