const settings = require('../config.json'),
      log = require('../enum/consoleLogging'),
      m = require('chalk');

exports.run = (client, message, params) => {
  if (!params[0]) {

    const commandNames = Array.from(client.commands.keys());

    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${client.commands.map(
    c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code:'asciidoc'});
    log(`Help command used by ${m.cyan.bold(message.author.tag)} in ${m.cyan.bold(message.channel.name)} on ${m.cyan.bold(message.guild.name)}`);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      let aliases = command.conf.aliases;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${aliases}`, {code:'asciidoc'});
      log(`Help command used by ${m.cyan.bold(message.author.tag)} to show help about ${m.cyan.bold(command.help.name)} in ${m.cyan.bold(message.channel.name)} on ${m.cyan.bold(message.guild.name)}`);
    } 
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['h', 'halp', 'help', 'ineedanadult'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands',
  usage: 'help <command>'
};