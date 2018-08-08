        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = async (client, message, params, command_success, command_fail, ops) => {

    message.channel.send('Fetching Song Queue...')
    .then(async msg => {

        let fetched = ops.active.get(message.guild.id);

        if(!fetched) return msg.edit('There currently is no music playing on this server');

        let queue = fetched.queue,
            nowPlaying = queue[0],
            resp = `__**Now Playing**__\n\`[${func.ytSecondsToHms(nowPlaying.songLength)}]\` **${nowPlaying.songTitle}** -- **Requested By:** *${nowPlaying.requester_member}*\n\n__**Queue**__\n`,
            embed = { },
            total_length = parseInt(nowPlaying.songLength);

        for (var i = 1; i < queue.length && i <= 10; i++) {
            resp += `\`${i}.\` \`[${func.ytSecondsToHms(queue[i].songLength)}]\` **${queue[i].songTitle}** -- **Requested By:** *${queue[i].requester_member}*\n`;
            total_length += parseInt(queue[i].songLength)
        }
        extra_pages = Math.floor(queue.length/10);

        embed.description = resp;
        embed.color = 0xc05ae2;
        embed.footer = {
            text : `Showing page ${1} of ${extra_pages+1}`
        }
        message.react(command_success);
        msg.edit(`:notes: **Current Queue** | *${queue.length}* entries, **playlist length:** \`[${func.ytSecondsToHms(total_length)}]\``)
        await message.channel.send({embed});

    })
    .catch(err => {
        message.react(command_fail);
        log.error(err);
    })
    

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['queue', 'songs'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'playlist',
    description: 'Lists all the songs in the playlist',
    usage: 'playlist'
}