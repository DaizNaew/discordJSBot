const search = require("youtube-search"),
      m = require('chalk');

module.exports = (input,msg) => {

    const config = require('../config.json'),
          log = require('../enum/consoleLogging');

    let response;

    var opts = {
        maxResults: 1,
        key: config.ytKey,
        type: 'video'
    };
    
    return new Promise((resolve, reject) => {
        search(input, opts, function(err, results) {
            if(err) {
                response = `Failed to find video [${err}]`;
                log.error(`I failed to execute this [${err}]`);
                return reject(response);
            };
            return resolve(results[0]);
    
        });
    })
    
}