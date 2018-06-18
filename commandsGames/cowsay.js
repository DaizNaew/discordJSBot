        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        cowsay = require('cowsay');

exports.run = (client, message, params, command_success, command_fail) => {
    if(!params[0]) return message.channel.send('The cow does not want to be mute');
    let input = params.slice(0).join(" ");
    if(input.length > 50) return message.channel.send('The cow does not want to say this many characters, try with less');
    message.channel.send('Grassing on the fields...')
    .then(msg => {
        message.delete();
        msg.edit(cowsay.say({
            text: input
        }),{code: "asciidoc"})
    })
    .catch(err => {
        log.error(err);
        
    })
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'cowsay',
    description: 'Makes the cow say',
    usage: 'cowsay <input>'
}