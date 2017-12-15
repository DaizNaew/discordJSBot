const Song = require('../model/song');

exports.run = (client, message) => {
    const vChan = message.member.voiceChannel;

    //console.dir(vChan);
    //console.dir(client.commands);
    const broadcast = client.broadcasts;

    for(const connection of broadcast) {
        connection.end();
    }
    message.channel.send('I stopped playing sounds. :mute:');
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