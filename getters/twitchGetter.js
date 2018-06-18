        //Local Files
const   log = require('../enum/consoleLogging'),
        //nodeJS plugins
        ax = require('axios');

module.exports = {

    /**
     * @returns {JSON} config file
     */

    config:function(){
        return require('../config.json')
    },

    /**
     * Fetches some data about a user from Twitch
     * @param {string} search_value The value to search by, wether name or ID
     * @param {string} twitchChannel The value to search for, can be inputted as a name or ID
     * @returns {promise} returns the data in a promise form for better handling
     */

    getUserData:function(search_value,twitchChannel){
        return ax({
            method:'get',
            baseURL: 'https://api.twitch.tv/',
            url: 'helix/users?'+search_value+'='+twitchChannel,
            headers: {
                'Client-ID': this.config().twitch_module.twitch_client_id,
                'Accept' : 'application/vnd.twitchtv.v5+json'
            }
        })
        .then( response => {
            return response.data.data;
        })
        .catch(err => {
            log.error( err);
        });
    },

    /**
     * Fetches some data about a specific stream from the specified user
     * @param {int} user_id The user to search for, based on the users ID
     * @returns {promise} returns the data in a promise form for better handling
     */

    getLiveStatus:function(user_id) {
        return ax({
            method:'get',
            baseURL: 'https://api.twitch.tv/',
            url: 'helix/streams?user_id='+user_id,
            headers: {
                'Client-ID': this.config().twitch_module.twitch_client_id,
                'Accept' : 'application/vnd.twitchtv.v5+json'
            }
        })
        .then(response => {
            let result = response.data.data[0];
            return result;
        })
        .catch(err => {
            log.error( err);
        })
    },

    /**
     * Fetches some data about a specific game, based on its internal ID at twitch
     * @param {int} game_id The game to search for, based on the games ID
     * @returns {promise} returns the data in a promise form for better handling
     */
    
    getGameInfo:function (game_id){
        return ax({
            method:'get',
            baseURL: 'https://api.twitch.tv/',
            url: 'helix/games?id='+game_id,
            headers: {
                'Client-ID': this.config().twitch_module.twitch_client_id,
                'Accept' : 'application/vnd.twitchtv.v5+json'
            }
        })
        .then( response => {
            let result = response.data.data[0];
            return result;
        })
        .catch(err => {
            log.error( err);
            return err;
        });

    }
}
