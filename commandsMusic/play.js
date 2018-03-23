        //Local Files
const log = require('../enum/consoleLogging'),
        //NodeJS Modules
      m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("Fetching a song to play...")
    .then(msg => {
        const vChan = message.member.voiceChannel;
        let input = params.slice(0).join(" ");
        require('../func/youtubeGetter')(client, message, vChan, input, msg);        
    })
    .catch(error => {
        log.error(`The Play command failed with [${error}]`);
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['play', 'song', 'Song'],
    permLevel: 0
}

exports.help = {
    name: 'play',
    description: 'Plays a defined song, or just resumes the playlist',
    usage: 'play <songname / URL> to play a specific song, or supply no arguments to play the playlist'
}