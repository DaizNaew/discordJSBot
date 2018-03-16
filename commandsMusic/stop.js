const Song = require('../model/song'),
        log = require('../enum/consoleLogging'),
        m = require('chalk');

exports.run = (client, message) => {

    message.channel.send("Trying to stop playing music")
    .then(msg => {
        try {
            const vChan = message.member.voiceChannel;
            //console.dir(vChan);
            //console.dir(client.commands);
            const broadcast = client.broadcasts;
            vChan.connection.dispatcher.end();
            
            msg.edit('I stopped playing sounds. :mute:');
            log(`Play command used by ${m.cyan.bold(message.author.tag)} to stop playing music in ${m.cyan.bold(vChan.name)} on ${m.cyan.bold(message.guild.name)}`);
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
    guildOnly: false,
    aliases: ['Stop', 'endme', 'shutup'],
    permLevel: 0
}

exports.help = {
    name: 'stop',
    description: 'Stop playing music in the voice channel',
    usage: 'stop'
}