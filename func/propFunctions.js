const fs = require("fs"),
      log = require('../enum/consoleLogging');

module.exports = {
  
    //Standard functions
    arrayifyJSON: function(arrayToJSON) {
        return JSON.parse(arrayToJSON, null, 4);
    },
    beautifyJSON: function(jsonToString){
        return JSON.stringify(jsonToString, null, 4);
    },
    writeToFileAsync: function(file, input) {
        fs.writeFile(file, input, (err) => {
            if (err) console.error(err);
        });
    },
    writeToFileSync: function(file, input) {
        fs.writeFileSync(file, input);
    },
    readFromFileSync: function(file) {
        return JSON.parse(fs.readFileSync(file,'utf8'));
    },
    
    //Function to check if a directory exists
    checkDirectory: function(directory, callback){
        fs.stat(directory, function(err, stats) {
        //Check if error defined and the error code is "not exists"
            if (err && err.errno === -4058) {
                //Create the directory, call the callback.
                fs.mkdir(directory, callback);
            } else {
                //just in case there was a different error:
                callback(err)
            }
        });
    },

    //Function to check if a certain file exists
    checkAllDeps: function(FilePos) {
    
        fs.open(FilePos, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    log.success(`${FilePos} already exists and is valid.`);
                    return;
                }
                throw err;
            }
            log.warning(`${FilePos} does not exist, creating it.`);
            this.writeToFileSync(FilePos, " { } ");
            log.success(`Successfully created file at: ${FilePos}`);
        });
    },

    constructServerSetting:function(FilePos, client) {
        fs.open(FilePos, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    log.success(`${FilePos} already exists and is valid.`);
                    return true;
                }
                throw err;
            }
            log.warning(`${FilePos} does not exist, creating it.`);
            guildList = new Object;
            
            client.guilds.map((g) => {
                if(!guildList[g.id]) {
                    guildList[g.id] = { 'name':g.name };
                    guildList[g.id]['commands'] = new Object;
                    client.commands.map((c) => {
                        guildList[g.id]['commands'][c.help.name] = [];
                        guildList[g.id]['commands'][c.help.name].push({
                            enabled: c.conf.enabled,
                            permLevel: c.conf.permLevel
                        })
                    });
                    guildList[g.id]['configs'] = [];
                    guildList[g.id]['configs'].push({
                        "prefix": "!",
                        "enable_twitter_module": true,
                        "enable_twitch_module" : true,
                        "enable_imgur_module" : true
                    });
                }
            })
            this.writeToFileSync(FilePos,this.beautifyJSON(guildList));
            log.success(`Successfully created file at: ${FilePos}`);
        });
    },

    //Function to construct a standard config
    constructConfig:function(FilePos) {
        fs.open(FilePos, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    log.success(`${FilePos} already exists and is valid.`);
                    return true;
                }
                throw err;
            }
            log.warning(`${FilePos} does not exist, creating it.`);
            this.writeToFileSync(FilePos, ` {
                \n"token": "###",
                \n"prefix": "!",
                \n"mprefix": "m",
                \n"ytKey": "###",
                \n"nothing" : 0,
                \n"botActivity": "Being a wee lil bitch",
                \n\n"twitter_module" : {
                    \n"twitter_consumer_key": "###",
                    \n"twitter_consumer_secret": "###",
                    \n"twitter_access_token_key": "###",
                    \n"twitter_access_token_secret": "###",
                    \n"enable_twitter_module": false,
                    \n"check_reply_to_tweets": false
                    \n},
                \n\n"twitch_module" : {
                    \n"enable_twitch_module": false,
                    \n"twitch_client_id" : "###"
                    \n},
                    \n"imgur_module" : {
                        \n"enable_imgur_module" : false,
                        \n"imgur_client_id" : "###"
                    \n}
                \n} `);
            log.success(`Successfully created file at: ${FilePos}`);
        });

    },
    secondsToHms:function (d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "0 minutes";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "0 seconds";
        return hDisplay + mDisplay + sDisplay; 
    }
}