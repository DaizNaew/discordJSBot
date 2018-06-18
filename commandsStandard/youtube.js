        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {
    message.channel.send('Fetching youtube video...')
    .then(msg => {
        let input = params.slice(0).join(" ");
        if(!input) {msg.edit('I need an input for this to work'); return message.react(command_fail);}
        youtube_result_promise = require('../getters/youtubeGetter')(input,msg);
        youtube_result_promise
        .then(result => {
            msg.edit(result.link);
        })
        .catch(error => {
            log.error(error); message.react(command_fail); msg.edit(error);
        })
    })
    .catch(error => {
        log.error(error); message.react(command_fail);
    });    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['yt'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'youtube',
    description: 'Searches for a youtube song with the desired input',
    usage: 'youtube <params>'
}