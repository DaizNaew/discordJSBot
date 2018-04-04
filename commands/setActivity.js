const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        m = require('chalk'),
        fs = require('fs');

exports.run = (client, message, params, command_success, command_fail) => {
    if(!message.member.permissions.has("MANAGE_NICKNAMES", true)) return message.channel.send('You do not have the required permissions to do this.');
    if(!params[0]) return message.channel.send('You need to add some parameters for this to work.');
    let input = params.slice(0).join(" ");
    if(input.length > 64) return message.channel.send('You tried to set my activity, but the parameter is too long for me daddy');
    message.channel.send('Setting activity...')
    .then(msg => {
        let settings = JSON.parse(fs.readFileSync("../config.json", "utf8"));
        //const settings = require('../../config.json');
        client.user.setActivity(input)
        .then( presence =>  {
            msg.edit(`Activity set to ${presence.localPresence.game ? presence.localPresence.game.name : 'none'}`);
            log.warning(`Presence is now ${m.cyan.bold(presence.localPresence.game ? presence.localPresence.game.name : 'none')}`);
            settings.botActivity = presence.localPresence.game ? presence.localPresence.game.name : 'none';
            func.writeToFileAsync('../config.json', func.beautifyJSON(settings));
        })
        .catch(error => log.error(error));
    })
    .catch(error => log.error(error));
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setgame'],
    permLevel: 0
}

exports.help = {
    name: 'setgame',
    description: 'Sets the activity of the bot',
    usage: 'setgame <params>'
}