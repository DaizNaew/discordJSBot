const fs = require("fs"),
      m = require("chalk");
      log = require('../enum/consoleLogging');

module.exports = client => {
    

    fs.readdir('./commands/', (err, files) => {
        if (err) log.error(err);
        log.splitter(`Loading a total of ${files.length} standard commands.`);
        files.forEach(f => {
            const props = require(`../commands/${f}`);
            if(props.conf.enabled){
                log.cmd(`Loading Command: ${m.cyan.bold(props.help.name)}. `);
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            }
        });
        console.log();
    });

    fs.readdir('./commandsMusic/', (err, files) => {
        if (err) log.error(err);
        log.splitter(`Loading a total of ${files.length} music commands.`);
        files.forEach(f => {
            const props = require(`../commandsMusic/${f}`);
            if(props.conf.enabled){
                log.mcmd(`Loading Command: ${m.cyan.bold(props.help.name)}. `);
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            }
        });
        console.log();
    });

    fs.readdir('./commandsGames/', (err, files) => {
        if (err) log.error(err);
        log.splitter(`Loading a total of ${files.length} game commands.`);
        files.forEach(f => {
            const props = require(`../commandsGames/${f}`);
            if(props.conf.enabled){
                log.gcmd(`Loading Command: ${m.cyan.bold(props.help.name)}. `);
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            }
        });
        console.log();
    });
}