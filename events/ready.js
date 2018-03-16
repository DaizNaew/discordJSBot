const   func = require('../func/propFunctions'),
        twit = require('../func/twitter.js'),
        fs = require('fs'),
        log = require('../enum/consoleLogging'),
        settings = require('../../config.json');

module.exports = client => {

    if(settings.enableTwitterModule)twit.initStream(client);

    client.user.setActivity(settings.botActivity);

    const channel = client.channels.get('411571330585067530');
    const date = new Date(channel.createdTimestamp);

    log.splitter('Init Bot');
    log.success('I am ready! And currently running in: '+client.guilds.size + ' Servers');
    log.success(`I am ${client.user.tag} residing in servers`);
    client.guilds.map( (g) => log.success(`${g.name} Created at: ${g.createdAt} Owned by: ${g.owner.user.tag}`));

    //Just a dirty linebreak
    console.log();

    log.splitter('Error Checking');
        func.checkDirectory("./storage/", function(err) {
            if(err) {
                log.error("Something went wrong: ",err);
            } else {
                log.success("No errors detected and I am good to go.\n");
            }
        });
        setTimeout(function() {
            log.splitter('Populated Directories');
            checkAllDeps("./storage/defaultTwitch.json");
            checkAllDeps("./storage/clientLog.json");
            checkAllDeps("./storage/playlist.json");
        }, 50);

        setTimeout(function() {
            console.log();
            log.splitter("Starting normal usage logging");            
        }, 100);
}

function checkAllDeps(FilePos) {
    
    fs.open(FilePos, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                log.success(`${FilePos} already exists and is valid.`);
                return;
            }
            throw err;
        }
        log.warning(`${FilePos} does not exist, creating it.`);
        func.writeToFileSync(FilePos, " { } ");
        log.success(`Successfully created file at: ${FilePos}`);
        });
}