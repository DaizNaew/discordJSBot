        //Local Files
const   log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("Trying to pause the music")
    .then(msg => {
        if(!message.member.voiceChannel.connection) return msg.edit('I need to be in a channel for that');
        try {
            message.member.voiceChannel.connection.dispatcher.pause();
            msg.edit('I paused the music. :pause_button: ');
        } catch(err) {
            
            log.error(`The Pause command failed with [${err}]`);
            msg.edit('Something went wrong inside me. 😞 : \n '+ err);
        }
    })
    .catch(err => {
        log.error(`The Pause command failed with [${err}]`);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'pause',
    description: 'Pauses the music in the voice channel',
    usage: 'pause'
}