        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = async (client, message, params, command_success, command_fail, ops) => {

    message.channel.send("Fetching a song to play...")
    .then(async msg => {
        const vChan = message.member.voiceChannel;
        let input = params.slice(0).join(" ");
        if(!input) {msg.edit('I need an input for this to work'); return message.react(command_fail);}
        await require('../modules/songPlayer')(client, message, vChan, input, msg, ops);
        msg.delete();
        message.react(command_success);
    })
    .catch(error => {
        log.error(`The Play command failed with [${error}]`);
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['song'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'play',
    description: 'Plays a defined song, or adds the song to the playlist',
    usage: 'play <songname / URL> to play a specific song or adds it to the playlist '
}