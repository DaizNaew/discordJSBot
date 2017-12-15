const Song = require('../util/song');

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
    aliases: ['stop', 'endme', 'shutup'],
    permLevel: 0
}

exports.help = {
    name: 'Stop',
    description: 'Stop playing music in the voice channel',
    usage: 'Stop'
}