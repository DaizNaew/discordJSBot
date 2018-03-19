const config = require('../../config.json'),
      ytdl = require("ytdl-core"),
      search = require("youtube-search"),
      Song = require('../model/song'),
      log = require('../enum/consoleLogging'),
      m = require('chalk');

exports.run = (client, message, params) => {

    message.channel.send("Fetching a song to play...")
    .then(msg => {
        const vChan = message.member.voiceChannel;
        let input = params.slice(0).join(" ");
        playSong(client, message, vChan, input, msg);
        
    })
    .catch(error => {
        log.error(`The Play command failed with [${error}]`);
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['play', 'song', 'Song'],
    permLevel: 0
}

exports.help = {
    name: 'play',
    description: 'Plays a defined song, or just resumes the playlist',
    usage: 'play <songname / URL> to play a specific song, or supply no arguments to play the playlist'
}

    function playSong(client, message, voiceChannel, input, msg) {
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
                    log.error("I have failed in a horrible way");
                    log.error(err);
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
                    log(`Play command used by ${m.cyan.bold(message.author.tag)} to play the song ${m.cyan.bold(song.name)} in ${m.cyan.bold(voiceChannel.name)} on ${m.cyan.bold(message.guild.name)}`);
                })
                .catch(console.error);
            });
        } else {
            response = 'Play <songname / URL> to play a specific song, or supply no arguments to play the playlist';
        }
        msg.edit(response);
    }