const fs = require("fs"),
      m = require("chalk"),
      _ = require("lodash"),
      log = require('../enum/consoleLogging');

module.exports = client => {
    
    const command_array = ['','Music','Games','Admin']
    let iteration = 0;

    _.forEach(command_array, element => {
        loadCommands(element,client,iteration);
        iteration++;
    });
}

function loadCommands(type,client,iteration) {

    const log_types = [log.cmd, log.mcmd, log.gcmd, log.acmd];

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