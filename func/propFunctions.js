const fs = require("fs"),
      log = require('../enum/consoleLogging');

module.exports = {

    /**
     * @typedef {object} guildMember
     * @type {object}
     * @typedef {object} DiscordClient
     * @type {object}
     */
  
    /**
     * Converts a JavaScript Object Notation (JSON) string into an object.
     * @param {JSON} arrayToJSON The JSON to convert to an object
     * @returns {Object} The constructed object
     */
    arrayifyJSON: function(arrayToJSON) {
        return JSON.parse(arrayToJSON, null, 4);
    },
    /**
     * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
     * @param {string} jsonToString The string which to convert to JSON
     * @returns {JSON} The constructed JSON object
     */
    beautifyJSON: function(jsonToString){
        return JSON.stringify(jsonToString, null, 4);
    },
    /**
     * (ASYNC) Takes an input and writes it to a file 
     * @param {string} file The file to write to
     * @param {string} input The input to write to the file
     */
    writeToFileAsync: function(file, input) {
        fs.writeFile(file, input, (err) => {
            if (err) console.error(err);
        });
    },
    /**
     * (SYNC) Takes an input and writes it to a file
     * @param {string} file The file to write to
     * @param {string} input The input to write to the file
     */
    writeToFileSync: function(file, input) {
        fs.writeFileSync(file, input);
    },
    /**
     * (SYNC) Takes a supplied file and reads it, then returns it as a JSON Object
     * @param {string} file The file to read from
     * @returns {JSON} The JSON object that was found
     */
    readFromFileSync: function(file) {
        return JSON.parse(fs.readFileSync(file,'utf8'));
    },
    /**
     * Takes a guildmember input and fetches the charaactersheet belonging to that member
     * @param {guildMember} member The member to lookup for
     * @returns {JSON} The charactersheet returned as a JSON Object
     */
    returnUserDate:function(member){
        return this.readFromFileSync('./storage/userStats/guilds/'+member.guild.id+'/users/'+member.user.id+'/userData.json');
    },
    /**
     * Fetches the racesheet needed for the RPG modules
     * @returns {JSON} The racesheet returned as a JSON Object
     */
    returnRaceSheet:function(){
        return this.readFromFileSync('./storage/RPG/races.json');
    },
    /**
     * Checks if a directory exists, if not it creates said directory
     * @param {string} directory The directory to lookup and check
     * @param {function} callback The callback function
     */
    checkDirectory: function(directory, callback){
        fs.stat(directory, function(err, stats) {
        //Check if error defined and the error code is "not exists"
        if(err) {
            if (err && err.errno === -4058 || err.errno === -2 && err.code === 'ENOENT') {
                //Create the directory, call the callback.
                fs.mkdir(directory, callback);
            }
        } else {
                //just in case there was a different error:
                callback(err)
            }
        });
    },
    /**
     * Checks if a file exists, if not it creates said file with an empty Object
     * @param {string} FilePos The file to lookup and check
     */
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
    /**
     * Creates a lot of folders and JSON files to hold the data about every guild and their members
     * @param {DiscordClient} client The current client, this is the client that's connected to Discord
     * @param {string} filePos The directory in which to store all this information
     */
    constructUsers:function (client, filePos) {
        this.checkDirectory(filePos+'/userStats',(err) => {
            if(err) {
                log.error(err);
            }
        });
        this.checkDirectory(filePos+'/userStats'+'/guilds',(err) => {
            if(err) {
                log.error(err);
            } else {
                client.guilds.map(async g => {
                    await this.checkDirectory(filePos+'/userStats'+'/guilds/'+g.id, async (err) => {
                        if(err) {
                            log.error(err);
                        } else {
                            await fs.open(filePos+'/userStats'+'/guilds/'+g.id+'/'+g.name, 'wx', (err, fd) => {
                                if(!err) {
                                    this.writeToFileSync(filePos+'/userStats'+'/guilds/'+g.id+'/'+g.name,'');
                                }
                            })
                            await this.checkDirectory(filePos+'/userStats'+'/guilds/'+g.id+'/users', async (err) => {
                                if(err) {
                                    log.error(err);
                                } else {
                                    g.members.map(async u => {
                                        await this.checkDirectory(filePos+'/userStats'+'/guilds/'+g.id+'/users/'+u.id, async (err) => {
                                            if(err) {
                                                log.error(err);
                                            } else {
                                                await fs.open(filePos+'/userStats'+'/guilds/'+g.id+'/users/'+u.id+"/"+u.user.username, 'wx', async (err, fd) => {
                                                    if (!err) {
                                                        await this.writeToFileSync(filePos+'/userStats'+'/guilds/'+g.id+'/users/'+u.id+"/"+u.user.username, " ");
                                                    }
                                                });
                                            }
                                        });
                                    })
                                }
                            });
                        }
                    });
                })
            }
        });
    },
    /**
     * Adds a single guildMember to the storage system
     * @param {guildMember} member The member to add to the system
     */
    addUser:function (member) {
        this.checkDirectory('./storage'+'/userStats'+'/guilds/'+member.guild.id+'/users/'+member.user.id, (err) => {
            if(!err) {
                fs.open('./storage'+'/userStats'+'/guilds/'+member.guild.id+'/users/'+member.user.id+"/"+member.user.username, 'wx', (err, fd) => {
                    if (!err) {
                        this.writeToFileSync('./storage'+'/userStats'+'/guilds/'+member.guild.id+'/users/'+member.user.id+"/"+member.user.username, " ");
                    }
                });
                this.addUserData(member).then((userDat) => {
                    this.writeToFileSync('./storage'+'/userStats'+'/guilds/'+member.guild.id+'/users/'+member.user.id+"/"+'userData.json',this.beautifyJSON(userDat));
                }).catch((err) => {
                    log.error(err)
                })
            }
        })
    },
    /**
     *Constructs the JSON Object storing all of the user data needed
     * @param {guildMember} member The member to add to the system
     * @returns {Promise} A promise used to handle the construction
     */
    addUserData:function(member) {

        return new Promise((resolve,reject) => {
            filePos = './storage'+'/userStats'+'/guilds/'+member.guild.id+'/users/'+member.user.id+"/"+'userData.json';
            fs.open(filePos, 'wx', (err, fd) => {
                if (!err) {
                    userDat = new Object;
                    userDat.userTag = member.user.tag;
                    userDat.firstNick = member.nickname;
                    userDat.createdAtDate = new Date(member.user.createdAt);
                    userDat.clientIsBot = member.user.bot;
                    userDat.messages = 0;
                    return resolve(userDat);
                } else {
                    return reject(err);
                }
            });
        })
    },
    /**
     * Creates files that handles the server specific settings
     * @param {DiscordClient} client The current client, this is the client that's connected to Discord
     * @param {string} FilePos The directory in which to store all this information
     */
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
            commandList = new Object;

            client.commands.map((c) => {
                if(!commandList[c.help.name]) {
                    commandList[c.help.name] = { 'command_Name' : c.help.name };
                    commandList[c.help.name]['guilds'] = new Object;
                    client.guilds.map((g) => {
                        commandList[c.help.name][`guilds`][g.id] = { 'guild_Name' : g.name }
                        commandList[c.help.name][`guilds`][g.id]['conf'] = new Object;
                        commandList[c.help.name][`guilds`][g.id]['conf'] = {
                            'enabled' : c.conf.enabled,
                            'perm_Level' : c.conf.permLevel,
                            'custom_Text' : 'custom'
                        }
                    });
                }
            });
            client.guilds.map((g) => {
                commandList[g.id] = new Object;
                commandList[g.id]['configs'] = new Object;
                commandList[g.id]['configs'] = {
                    "prefix": "!",
                    "enable_twitter_module": true,
                    "enable_twitch_module" : true,
                    "enable_imgur_module" : true
                };
            });
            this.writeToFileSync(FilePos,this.beautifyJSON(commandList));
            log.success(`Successfully created file at: ${FilePos}`);
        });
    },
    /**
     * Creates a general config file for the program
     * @param {string} FilePos The directory in which to store all this information
     */
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
                \n\n"mysql" : {
                    \n"host": "localhost",
                    \n"user": "none",
                    \n"password": "none",
                    \n"db": "none"
                \n},
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
    /**
     * Takes the directories used to hold commands and takes the suffix then return that as a category
     * @param {string} directory The directory in which to lookup for the categories
     * @returns {string} The handled category
     */
    getDirForCategory:function (directory) {

        fullPath = directory;
        path = fullPath.split("\\");
        cwd = path[path.length-1];
    
        category = cwd.replace('commands','');
    
        if(category == '') category = 'Standard';
        return category;
    
    },
    /**
     * Takes in seconds and converts them to a proper time format, complete with a formatted sentence
     * @param {number} d The time which to convert, supplied as seconds
     * @returns {string} The formatted time format
     */
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