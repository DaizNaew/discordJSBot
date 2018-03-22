        //Local Files
const   log = require('../enum/consoleLogging');

exports.run = (client, message) => {

    message.channel.send("Trying to stop playing music")
    .then(msg => {
        if(!message.member.voiceChannel.connection) return msg.edit('I need to be in a channel for that');
        try {
            message.member.voiceChannel.connection.dispatcher.end();
            msg.edit('I stopped playing music. :mute:');
        } catch(err) {
            
            log.error(`The Stop command failed with [${err}]`);
            msg.edit('Something went wrong inside me. 😞 : \n '+ err);
        }
    })
    .catch(err => {
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