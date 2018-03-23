        //Local Files
const   log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("Trying to stop playing music")
    .then(msg => {
        if(!message.member.voiceChannel.connection) {message.react(command_fail);return msg.edit('I need to be in a channel for that');}
        try {
            message.member.voiceChannel.connection.dispatcher.end();
            msg.edit('I stopped playing music. :mute:');
            message.react(command_success);
        } catch(err) {
            message.react(command_fail);
            log.error(`The Stop command failed with [${err}]`);
            msg.edit('Something went wrong inside me. 😞 : \n '+ err);
        }
    })
    .catch(err => {
        message.react(command_fail);
        log.error(`The Stop command failed with [${err}]`);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['Stop', 'endme', 'shutup'],
    permLevel: 0
}

exports.help = {
    name: 'stop',
    description: 'Stop playing music in the voice channel',
    usage: 'stop'
}