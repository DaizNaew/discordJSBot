const errorJoinMSG = `You need to be in a voice channel for me to join you`;
const config = require('../config.json');
const ytdl = require("ytdl-core");
const search = require("youtube-search");
const Song = require('../util/song');

exports.run = (client, message, params) => {

    message.channel.send("Fetching a song to play...")
    .then(msg => {
        const vChan = message.member.voiceChannel;
        let input = params.slice(0).join(" ");
        playSong(client, message, vChan, input, msg);
        
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['play'],
    permLevel: 0
}

exports.help = {
    name: 'Play',
    description: 'Plays a defined song, or just resumes the playlist',
    usage: 'Play <songname / URL> to play a specific song, or supply no arguments to play the playlist'
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
                if(err) return console.log(err);
                const song = new Song(results[0], message.member);
                let linkToPlay = song.link;
                //console.dir(results);
                if(!voiceChannel) msg.edit(errorJoinMSG);
                //
                response = `🎵 Now playing: ${song.name} 🎵`;
                voiceChannel.join()
                .then(connection => {
                    msg.edit(response);
                    const stream = ytdl(linkToPlay, { filter : 'audioonly'});
                    broadcast.playStream(stream);
                    const dispatcher = connection.playBroadcast(broadcast);
                    
                })
                .catch(console.error);
            });
        } else {
            response = 'Play <songname / URL> to play a specific song, or supply no arguments to play the playlist';
        }
        msg.edit(response);
    }