const ytdl = require("ytdl-core"),
      m = require('chalk'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions');

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
            songLength : info.length_seconds,
            thumbnail : info.thumbnail_url,
            requester_member : message.member,
            requester : message.author.tag,
            url : song.link,
            announceChannel : message.channel.id
        })

        if (!data.dispatcher) play(client, ops, data, msg, voiceChannel);
        else {
            msg.edit(`:notes: Added To Queue:`);
            msg.channel.send(constrEmbed(message.author.tag,message.member,info.length_seconds,info.title,song.link,info.thumbnail_url));
        }

        ops.active.set(message.guild.id, data);

    })
    .catch(error => {
        log.error(error);
        return msg.edit('The song you requested does not exist on youtube');
    })
}

async function play(client,ops,data,msg,voiceChannel) {

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter : 'audioonly'}))
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('speaking', async () => {
        msg.edit(`:notes: Now playing:`);
        msg.channel.send(constrEmbed(data.queue[0].requester,data.queue[0].requester_member,data.queue[0].songLength,data.queue[0].songTitle,data.queue[0].url,data.queue[0].thumbnail));
        log.warning(`Playing the song ${m.cyan.bold(data.queue[0].songTitle)} in ${m.cyan.bold(client.guilds.get(data.dispatcher.guildID).me.voiceChannel.name)}`);
    })

    data.dispatcher.once('end', () => {
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

/**
 * @param string The requesters tag as a string
 * @param member The requester as a guildMember
 * @param number The length of the song as a number
 * @param string The title of the song as a string
 * @param string The url of the song as a string
 * @param string The url of the Thumbnail for the song as a string
 * @returns The embed as an object
 */
function constrEmbed(requester, requester_member, songLength, songTitle, songUrl, songThumbnail) {

    embed = { };
    embed.author = { 
        name: 'Requested By: ' + requester,
        icon_url: requester_member.user.avatarURL
    };
    embed.description = `\`[${func.ytSecondsToHms(songLength)}]\` **${songTitle}**`;
    embed.fields = [{
        name: 'Link to the song on YT',
        value: `**[LINK](${songUrl})**`
    }];
    embed.thumbnail = {
        url: songThumbnail
    };
    embed.color = 0xc05ae2;

    return {embed};

}