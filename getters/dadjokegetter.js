        //Local Files
const   log = require('../enum/consoleLogging'),
        //nodeJS plugins
        ax = require('axios'),
        _ = require('lodash');

/**
 * Fetches a random dad joke from the specified website
 * @returns {promise} returns a promise that can be handled by another module
 */

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