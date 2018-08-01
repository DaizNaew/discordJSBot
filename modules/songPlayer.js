const ytdl = require("ytdl-core"),
      m = require('chalk'),
      log = require('../enum/consoleLogging');

module.exports = async (client, message, voiceChannel, input, msg, ops) => {

    const Song = require('../model/song');
          
    await require('../getters/youtubeGetter')(input,msg)
    .then(async result => {
        const song = new Song(result, message.member);
        if(!voiceChannel) return msg.edit(`You need to be in a voice channel for me to join you`);
        
        let validate = await ytdl.validateURL(song.link);
        if(!validate) return msg.edit('The song you requested does not exist on youtube');

        let info = await ytdl.getInfo(song.link);

        let data = ops.active.get(msg.guild.id) || {};

        if (!data.connection) data.connection = await voiceChannel.join();
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;

        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: song.link,
            announceChannel: message.channel.id
        })

        if (!data.dispatcher) play(client, ops, data, msg, voiceChannel);
        else {
            msg.edit(`Added To Queue: **${info.title}** | Requested By: **${message.author.tag}**`);
        }

        ops.active.set(message.guild.id, data);

        /*
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
        */

    })
    .catch(error => {
        log.error(error);
        return msg.edit('The song you requested does not exist on youtube');
    })
}

async function play(client,ops,data,msg,voiceChannel) {
    msg.channel.send(`🎵 Now playing: **${data.queue[0].songTitle}** 🎵 | Requested By: **${data.queue[0].requester}**`);
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter : 'audioonly'}))
    data.dispatcher.guildID = data.guildID;
    log.warning(`Playing the song ${m.cyan.bold(data.queue[0].songTitle)} in ${m.cyan.bold(client.guilds.get(data.dispatcher.guildID).me.voiceChannel.name)}`);

    data.dispatcher.on('end', () => {
        finish(client,ops,data.dispatcher,msg,voiceChannel)
    })
}

function finish(client,ops,dispatcher,msg, voiceChannel) {

    let fetched = ops.active.get(dispatcher.guildID);
    fetched.queue.shift();

    if(fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client, ops, fetched, msg);
    } else {
        ops.active.delete(dispatcher.guildID);
        if(voiceChannel) voiceChannel.leave();
    }
}