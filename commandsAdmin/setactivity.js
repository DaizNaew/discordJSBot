        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        fs = require('fs');

exports.run = (client, message, params, command_success, command_fail) => {
    if(message.member.id !== '128235918418116608') { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this.'); }
    if(!params[0]) { message.react(command_fail); return message.channel.send('You need to add some parameters for this to work.'); }
    let input = params.slice(0).join(" ");
    if(input.length > 64) { message.react(command_fail); return message.channel.send('You tried to set my activity, but the parameter is too long for me daddy'); }
    message.channel.send('Setting activity...')
    .then(msg => {
        let settings = JSON.parse(fs.readFileSync("../config.json", "utf8"));
        client.user.setActivity(input)
        .then( presence =>  {
            msg.edit(`Activity set to ${presence.localPresence.game ? presence.localPresence.game.name : 'none'}`);
            log.warning(`Presence is now ${m.cyan.bold(presence.localPresence.game ? presence.localPresence.game.name : 'none')}`);
            settings.botActivity = presence.localPresence.game ? presence.localPresence.game.name : 'none';
            func.writeToFileAsync('../config.json', func.beautifyJSON(settings));
            message.react(command_success);
        }).catch(error => { log.error(error); message.react(command_fail); });
    }).catch(error => { log.error(error); message.react(command_fail); });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setgame'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'setgame',
    description: 'Sets the activity of the bot',
    usage: 'setgame <params>'
}