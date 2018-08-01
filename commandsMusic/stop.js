        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions');

exports.run = (client, message, params, command_success, command_fail, ops) => {

    message.channel.send("Trying to stop playing music")
    .then(msg => {
        if(!message.member.voiceChannel) {
            message.react(command_fail);
            return msg.edit('You need to be in a voicechannel to do this');
        }
        if(!message.guild.me.voiceChannel) {
            message.react(command_fail);
            return msg.edit('I am not connected to any voicechannels');
        }

        if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
            message.react(command_fail);
            return msg.edit('We need to be in the same voicechannel for this to work');
        }
        try {
            let data = ops.active.get(msg.guild.id) || {};
            data.dispatcher.end();
            message.guild.me.voiceChannel.leave();
            msg.edit('I stopped playing music. :mute:');
            message.react(command_success);
        } catch(err) {
            message.react(command_fail);
            log.error(`The Stop command failed with [${err}]`);
            msg.edit('Something went critically wrong inside me. 😞 : \n '+ err);
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
    aliases: ['endme', 'shutup', 'leave'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'stop',
    description: 'Stop playing music in the voice channel',
    usage: 'stop'
}