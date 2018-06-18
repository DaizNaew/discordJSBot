const   func = require('../func/propFunctions'),
        log = require('../enum/consoleLogging'),
        twitch = require('../getters/twitchGetter');

module.exports = client => {

    settings = require('../config.json');

    //Sets the activity of the bot
    client.user.setActivity(settings.botActivity);

    //Start of initialization logging
    log.splitter('Init Bot');
    log.success(`I am ${client.user.tag} and I'm ready to be of use :) `);
    log.success(`My activity is currently set to be: ${settings.botActivity}`);
    log.success(`Currently residing in ${client.guilds.size} servers: `);
    client.guilds.map( (g) => log.success(`${g.name} Created at: ${g.createdAt} Owned by: ${g.owner.user.tag}`));

    //Just a dirty linebreak
    console.log();

    //Start of error Checking on storage
    log.splitter('Error Checking');
        //Checks Storage
        func.checkDirectory("./storage/", function(err) {
            if(err) {
                log.error("Something went wrong: ",err);
            } else {
                log.success("No errors found in storage directory.");
            }
        });
        //Checks Config
        func.checkDirectory("./config/", function(err) {
            if(err) {
                log.error("Something went wrong: ",err);
            } else {
                log.success("No errors found in config directory.\n");
            }
        });
        //Checks Dependencies and directories
        setTimeout(function() {
            log.splitter('Populated Directories');
            //Checks Storage Directories for JSON files
            func.checkAllDeps("./storage/defaultTwitch.json");
            func.checkAllDeps("./storage/clientLog.json");
            func.checkAllDeps("./storage/playlist.json");
            func.checkAllDeps("./storage/suggestionBox.json");
            func.checkAllDeps("./storage/twitterFolk.json");
            func.checkAllDeps("./storage/twitchFolk.json");
            //Checks Config Directories for JSON files
            func.constructServerSetting("./config/serverSettings.json", client)
            
        }, 70);
    //End of error checking on storage

        setTimeout(function() {
            func.constructConfig("./config.json");
        }, 95)

        setTimeout(function() {
            console.log();
            log.splitter("Starting normal usage logging");            
        }, 120);
}