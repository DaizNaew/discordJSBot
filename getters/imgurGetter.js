        //Local Files
const   log = require('../enum/consoleLogging'),
        //nodeJS plugins
        ax = require('axios'),
        _ = require('lodash');
  
/**
 * Fetches a a picture or album from imgur.
 * @param {string} selection what keywords to look for
 * @param {string} params parameters to sort by
 * @returns {promise} returns a promise that can be handled by another module
 */

module.exports = (message, params, selection) => {
    const config = require('../config.json');
    return ax({
        method:'get',
        baseURL: 'https://api.imgur.com/3/',
        url:'gallery/search/'+selection+'/?q_all='+params,
        headers: {
            'Authorization': 'Client-ID '+config['imgur_module'].imgur_client_id
        }
    })
    .then( response => {
        let imgur_data = response.data.data[_.random(response.data.data.length)];
        return imgur_data;
    })
    .catch(err => {
        log.error(err);
    });
}