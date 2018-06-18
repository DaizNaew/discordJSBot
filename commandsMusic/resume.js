        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("Trying to resume the music")
    .then(msg => {
        if(!message.member.voiceChannel.connection) return msg.edit('I need to be in a channel for that');
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
    aliases: [],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'resume',
    description: 'Resumes the music in the voice channel',
    usage: 'resume'
}