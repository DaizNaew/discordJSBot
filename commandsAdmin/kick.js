        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        fs = require('fs');

exports.run = (client, message, params, command_success, command_fail) => {
    if(!message.member.permissions.has("KICK_MEMBERS", true)) { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this.'); }
    if(!params[1]) { message.react(command_fail); return message.channel.send('You need to add some parameters for this to work.'); }
    let input = params.slice(1).join(" ");

    member = message.mentions.members.first();

    member.kick(input).then((user) => {
        message.channel.send(`I just kicked ${user.displayName} from the server.`)
        message.react(command_success);
        
    }).catch(error => log.error(error));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['end', 'kill'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'kick',
    description: 'Kicks a user from the guild',
    usage: 'kick <user as tag> <reason>'
}