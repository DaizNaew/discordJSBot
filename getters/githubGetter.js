        //Local Files
const   log = require('../enum/consoleLogging'),
        //nodeJS plugins
        ax = require('axios'),
        _ = require('lodash');

/**
 * Fetches a source from github.
 * @param {string} selection what repo to look through
 * @param {string} params parameters to sort by
 * @returns {promise} returns a promise that can be handled by another module
 */
    
module.exports = (message, selection, params) => {
    const config = require('../config.json');
    return ax({
        method:'get',
        baseURL: 'https://api.github.com/',
        url: `${selection}?${params}`,
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then( response => {
        return response;
    })
    .catch(err => {
        log.error(err);
    });
}