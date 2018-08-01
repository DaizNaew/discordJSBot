        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = async (client, message, params, command_success, command_fail, ops) => {

    message.channel.send('Fetching Song Queue...')
    .then(msg => {

        let fetched = ops.active.get(message.guild.id);

        if(!fetched) return message.channel.send('There currently is no music playing on this server');

        let queue = fetched.queue,
            nowPlaying = queue[0],
            resp = `__**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested By:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;

        for (var i = 1; i < queue.length; i++) {
            resp += `${i}. **${queue[i].songTitle}** -- **Requested By:** *${queue[i].requester}*\n`;

        }
        message.react(command_success);
        msg.edit(resp);

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