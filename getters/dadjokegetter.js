    //Local Files
const log = require('../enum/consoleLogging'),
    //nodeJS plugins
    ax = require('axios'),
    _ = require('lodash');
  
module.exports = function() {
    return ax({
        method:'get',
        baseURL: 'https://icanhazdadjoke.com/',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then( response => {
        return response.data;
    })
    .catch(err => {
        log.error(err);
    });
}