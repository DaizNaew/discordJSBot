exports.run = (client, message, params, command_success, command_fail) => {
            //Local Files
    const   settings = require('../config.json'),
            func = require('../func/propFunctions'),
            log = require('../enum/consoleLogging'),
            serverSettings = func.readFromFileSync('./config/serverSettings.json');

    if (!params[0]) {

        prefix = settings.prefix;
        if(message.guild) prefix = serverSettings[message.guild.id]['configs'].prefix;

        const commandNames = Array.from(client.commands.keys());
        enabledCommands = `= Enabled Commands =`;
        disabledCommands = `\n= Disabled Commands =`;
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        client.commands.map(
            (c) => {
            if(!message.guild) {disabledCommands =``;return enabledCommands += `\n${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`;}
            if(!serverSettings[c.help.name]['guilds'][message.guild.id].enabled) {
                disabledCommands += `\n${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`;
            } else {
                enabledCommands += `\n${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`;
            }
        });
        
        message.author.send(`= Command List =\n\n[Use ${prefix}help <commandname> for details]\n\n${enabledCommands} \n${disabledCommands}`, { code: 'asciidoc' }).then(msg => message.react(command_success)).catch(err => {log.error(err); message.react(command_fail)});
        
        
    } else {
        let command = params[0],
            to_show = params[1];

        if (client.commands.has(command)) {
            command = client.commands.get(command);
            let aliases = command.conf.aliases;
            if(to_show && to_show == 'show') 
            {
                message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nusable in guild only:: ${command.conf.guildOnly}\naliases:: ${aliases}`, { code: 'asciidoc' }).then(msg => message.react(command_success)).catch(err => {log.error(err); message.react(command_fail)});
            } else {
               message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nusable in guild only:: ${command.conf.guildOnly}\naliases:: ${aliases}`, { code: 'asciidoc' }).then(msg => message.react(command_success)).catch(err => {log.error(err); message.react(command_fail)});
            }
            
        } else if (!client.commands.has(command)) {
            message.react(command_fail);
        }
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h', 'halp', 'help', 'ineedanadult'],
    permLevel: 0
};

exports.help = {
    name: 'help',
    description: 'Displays all the available commands',
    usage: 'help <command> <show (to show it in channel, only works on specific commands)>'
};