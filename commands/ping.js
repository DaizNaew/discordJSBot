        //Local Files
const   log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {

     message.channel.send('Pinging...')
    .then( msg => {
        msg.edit(`I have reported a ***${client.ping}*** ms delay to the server.`);
        message.react(command_success);
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Ping command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['delay'],
    permLevel: 0
}

exports.help = {
    name: 'ping',
    description: 'Gets the current delay to the discord server from the bot',
    usage: 'ping'
}
