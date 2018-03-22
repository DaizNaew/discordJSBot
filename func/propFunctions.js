const fs = require("fs"),
      log = require('../enum/consoleLogging');

module.exports = {
  
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

    constructConfig:function(FilePos) {
        let conf;

        conf = fs.open(FilePos, 'wx', (err, fd) => {
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
                    \n"consumer_key": "###",
                    \n"consumer_secret": "###",
                    \n"access_token_key": "###",
                    \n"access_token_secret": "###",
                    \n"enableTwitterModule": false,
                    \n"check_reply_to_tweets" : false,
                    \n"botActivity": "Being a wee lil bitch"
                \n} `);
            log.success(`Successfully created file at: ${FilePos}`);
        });

    }

    

}