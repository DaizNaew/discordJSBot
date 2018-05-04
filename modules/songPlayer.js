const ytdl = require("ytdl-core"),
      m = require('chalk');

module.exports = (client, message, voiceChannel, input, msg) => {

    const Song = require('../model/song'),
          log = require('../enum/consoleLogging');

    require('../getters/youtubeGetter')(input,msg)
    .then(result => {

        const streamOptions = { seek: 0, volume: 0.2 };

        const broadcast = client.createVoiceBroadcast();
        let response;

        const song = new Song(result, message.member);
        if(!voiceChannel) msg.edit(`You need to be in a voice channel for me to join you`);
        response = `🎵 Now playing: **${song.name}** 🎵`;
        voiceChannel.join()
        .then(connection => {
            msg.edit(response);
            const stream = ytdl(song.link, { filter : 'audioonly'});
            broadcast.playStream(stream);
                    
            var dispatcher = connection.playBroadcast(broadcast,streamOptions);

            dispatcher.on('end', () => {
            voiceChannel.leave();
            });
            log.warning(`Playing the song ${m.cyan.bold(song.name)} in ${m.cyan.bold(voiceChannel.name)}`);
        })
        .catch(console.error);

        msg.edit(response);

    })
    .catch(error => {
        log.error(error);
    })

    
}