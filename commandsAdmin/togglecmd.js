        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    if(!message.member.permissions.has("ADMINISTRATOR", true)) { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this.'); }
    if(!params[0]) { message.react(command_fail); return message.channel.send('You need specify what channel to toggle'); }
    if(params[0] == 'togglecmd') return message.channel.send(`Don't be silly now, you can't toggle this command off, that would get you nowhere`);
    message.channel.send('Toggling command...')
    .then(msg => {
        let serverSettings = func.readFromFileSync("./config/serverSettings.json");
        try{
            current_state = serverSettings[params[0]]['guilds'][message.guild.id]['conf'].enabled;
            serverSettings[params[0]]['guilds'][message.guild.id]['conf'].enabled = !current_state;
            func.writeToFileAsync('./config/serverSettings.json', func.beautifyJSON(serverSettings));
            log.warning(`Toggled command ${params[0]} to enabled:${serverSettings[params[0]]['guilds'][message.guild.id]['conf'].enabled} for ${message.guild.name}`);
            msg.edit(`Toggled command ${params[0]} to enabled:${serverSettings[params[0]]['guilds'][message.guild.id]['conf'].enabled}`);
            message.react(command_success);
        } catch(error) {
            msg.edit(`The command [${params[0]}] you tried to toggle does not exist`);
            log.error(error);
        }
    }).catch(error => { log.error(error); message.react(command_fail); });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'togglecmd',
    description: 'Toggles a command on or off',
    usage: 'togglecmd <command name>'
}