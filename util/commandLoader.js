const fs = require("fs"),
      m = require("chalk"),
      _ = require("lodash"),
      log = require('../enum/consoleLogging');

module.exports = client => {
    
    let iteration = 0;

    _.forEach(client.commandCategories, element => {
        loadCommands(element,client,iteration);
        iteration++;
    });
}

CommandDefines = [
    'A group of Standard commands, these normally require no specific permissions to use',
    'A group of Musical commands, these might have some specific permissions to use',
    'A group of Gamey commands, these normally require no specific permissions to use, they are just for fun',
    'A group of Admin commands, these all require a set of specific permission to use, reserved for admins and moderators',
    'A group of RPG commands, these commands are used if you have the RPG module enabled on the server'
]

function loadCommands(type,client,iteration) {

    client.commandCategoriesCollection.set(type, {iteration:iteration, key:type, define:CommandDefines[iteration]});

    const log_types = [log.cmd, log.mcmd, log.gcmd, log.acmd, log.rpgcmd];

    fs.readdir(`./commands${type}/`, (err, files) => {
        if (err) log.error(err);
        log.splitter(`Loading a total of ${files.length} ${type} commands.`);
        files.forEach(f => {
            const props = require(`../commands${type}/${f}`);
            if(props.conf.enabled){
                log_types[iteration](`Loading Command: ${m.cyan.bold(props.help.name)}. `);
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            }
        });
        console.log();
    });
}