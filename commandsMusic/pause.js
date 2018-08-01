        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions');

exports.run = (client, message, params, command_success, command_fail, ops) => {

    message.channel.send("Trying to pause the music")
    .then(msg => {

        let fetched = ops.active.get(message.guild.id);

        if(!fetched) return message.channel.send('There currently is no music playing on this server');
        
        if(!message.member.voiceChannel.connection) return msg.edit('I need to be in a voice channel for that');
        
        if(message.member.voiceChannel !== message.guild.me.voiceChannel) return msg.edit('You need to be in the same voice channel as me to do this');

        if(fetched.dispatcher.paused) return msg.edit('The music is already paused');

        try {
            fetched.dispatcher.pause();
            message.react(command_success);
            msg.edit('I paused the music. :pause_button: ');
        } catch(err) {
            message.react(command_fail);
            log.error(`The Pause command failed with [${err}]`);
            msg.edit('Something went wrong inside me. 😞 : \n '+ err);
        }
    })
    .catch(err => {
        message.react(command_fail);
        log.error(`The Pause command failed with [${err}]`);
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
    name: 'pause',
    description: 'Pauses the music in the voice channel',
    usage: 'pause'
}