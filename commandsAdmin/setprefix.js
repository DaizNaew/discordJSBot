const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {
    if(!message.member.permissions.has("ADMINISTRATOR", true)) { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this.'); }
    if(!params[0]) { message.react(command_fail); return message.channel.send('You need to add some parameters for this to work.'); }
    let input = params.slice(0).join(" ");
    if(input.length > 64) { message.react(command_fail); return message.channel.send('You tried to set my prefix, but the parameter is too long for me daddy'); }
    message.channel.send('Setting prefix...')
    .then(msg => {
        let serverSettings = func.readFromFileSync("./config/serverSettings.json");

        serverSettings[message.guild.id]['configs'][0].prefix = input;
        func.writeToFileAsync('./config/serverSettings.json', func.beautifyJSON(serverSettings));
        log.warning(`Prefix for ${message.guild.name} is now ${m.cyan.bold(input)}`);
        msg.edit(`Prefix set to ${input}`);
        message.react(command_success);

    }).catch(error => { log.error(error); message.react(command_fail); });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'setprefix',
    description: 'Sets the prefix to use on this server',
    usage: 'setprefix <prefix>'
}