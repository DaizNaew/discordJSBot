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

        if(message.member.voiceChannel !== message.guild.me.voiceChannel) return msg.edit('You need to be in the same voice channel as me to do this');

        let userCount = message.member.voiceChannel.members.size;

        let required = Math.ceil(userCount/2);

        if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

        if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry you already voted to skip. ${fetched.queue[0].voteSkips.length}/${required} required`);

        fetched.queue[0].voteSkips.push(message.member.id);

        ops.active.set(message.guild.id, fetched);

        if(fetched.queue[0].voteSkips.length >= required) {
            msg.edit('Successfully skipped the song')
            message.react(command_success);
            return fetched.dispatcher.emit('end');
        } else {
            message.react(command_success);
            msg.edit(`successfully voted to skip. ${fetched.queue[0].voteSkips.length}/${required} required`)
        }
        
    })
    .catch(err => {
        message.react(command_fail);
        log.error(err);
    })
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['next'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'skip',
    description: 'Skips to next song in queue',
    usage: 'skip'
}