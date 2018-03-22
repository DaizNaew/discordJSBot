const   log = require('../enum/consoleLogging');

exports.run = (client, message) => {

     message.channel.send('Pinging...')
    .then( msg => {
        msg.edit(`I have reported a ***${client.ping}*** ms delay to the server.`);
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Ping command failed to execute [${error}]`)
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Ping', 'delay'],
    permLevel: 0
}

exports.help = {
    name: 'ping',
    description: 'Gets the current delay to the discord server from the bot',
    usage: 'ping'
}
