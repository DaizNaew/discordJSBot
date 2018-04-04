const search = require("youtube-search"),
      ytdl = require("ytdl-core"),
      m = require('chalk');

module.exports = (client, message, voiceChannel, input, msg) => {

    const config = require('../config.json'),
          Song = require('../model/song'),
          log = require('../enum/consoleLogging');

    const streamOptions = { seek: 0, volume: 0.2 };

        const broadcast = client.createVoiceBroadcast();
        let response;

        var opts = {
            maxResults: 1,
            key: config.ytKey,
            type: 'video'
        };
    
        if(input) {
            search(input, opts, function(err, results) {
                
                if(err) {
                    response = `❌ The command wasn't executed propperly [${err}] ❌`;
                    log.error(`I failed to execute this [${err}]`);
                    return msg.edit(response);
                };
                
                const song = new Song(results[0], message.member);
                let linkToPlay = song.link;
                if(!voiceChannel) msg.edit(`You need to be in a voice channel for me to join you`);
                response = `🎵 Now playing: ${song.name} 🎵`;
                voiceChannel.join()
                .then(connection => {
                    msg.edit(response);
                    const stream = ytdl(linkToPlay, { filter : 'audioonly'});
                    broadcast.playStream(stream);
                    
                    var dispatcher = connection.playBroadcast(broadcast,streamOptions);

                    dispatcher.on('end', () => {
                    voiceChannel.leave();
                    });
                    log.warning(`Playing the song ${m.cyan.bold(song.name)}`);
                })
                .catch(console.error);
            });
        } else {
            response = 'Play <songname / URL> to play a specific song, or supply no arguments to play the playlist';
        }
        msg.edit(response);
}