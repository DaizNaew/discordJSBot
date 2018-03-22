        //Local Files
const   log = require('../enum/consoleLogging');

exports.run = (client, message) => {

    message.channel.send("Trying to resume the music")
    .then(msg => {
        try {
            message.member.voiceChannel.connection.dispatcher.resume();
            msg.edit('I resumed the music. :play_pause:');
        } catch(err) {
            
            log.error(`The resume command failed with [${err}]`);
            msg.edit('Something went wrong inside me. 😞 : \n '+ err);
        }
    })
    .catch(err => {
        log.error(`The resume command failed with [${err}]`);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['Resume'],
    permLevel: 0
}

exports.help = {
    name: 'resume',
    description: 'Resumes the music in the voice channel',
    usage: 'resume'
}