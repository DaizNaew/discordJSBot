exports.run = (client, message, params, command_success, command_fail) => {
    const   settings = require('../config.json'),
            func = require('../func/propFunctions'),
            serverSettings = func.readFromFileSync('./config/serverSettings.json');

    if (!params[0]) {

        prefix = settings.prefix;
        if(message.guild) prefix = serverSettings[message.guild.id]['configs'][0].prefix;

        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        message.author.send(`= Command List =\n\n[Use ${prefix}help <commandname> for details]\n\n${client.commands.map(
        c => `${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, { code: 'asciidoc' });
        message.react(command_success);
        
    } else {
        let command = params[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            let aliases = command.conf.aliases;
            message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nusable in guild only:: ${command.conf.guildOnly}\naliases:: ${aliases}`, { code: 'asciidoc' });
            message.react(command_success);
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
    usage: 'help <command>'
};