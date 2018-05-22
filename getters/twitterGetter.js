const   Twitter = require('twitter'),
        // Local files
        log = require("../enum/consoleLogging");

module.exports = {

    /**
     * Constructs an object used for handling login into twitter and performing a proper OAuth 1.0 authentication
     * @returns {object} Returns a valid twitter user based on the inputted keys.
     */

    getClient:function(){
        try {
            config = require("../config.json");
            var client = new Twitter({
                consumer_key: config['twitter_module'].twitter_consumer_key,
                consumer_secret: config['twitter_module'].twitter_consumer_secret,
                access_token_key: config['twitter_module'].twitter_access_token_key,
                access_token_secret: config['twitter_module'].twitter_access_token_secret
            });
            return client;

        } catch(error) {
            log.error(error);
        }
        
    },

    /**
     * Fetches a twitter user based on their screen name as shown on twitter
     * @param {string} user_to_search_for The user to lookup, based on their screen name
     * @returns {Promise} returns a promise for better async handling
     */

    getUserID:function(user_to_search_for){
        try {
            var client = this.getClient();
            return new Promise((resolve, reject) => {
                client.get('users/show', {screen_name: user_to_search_for}, function(error, response) {
                    if(error) {
                        return reject(log.error('Failed to find the user'));
                    }
                return resolve(response);
                });
            });
        } catch(error) {
            log.error(error);
        }
        
    },

    /**
     * Fetches a tweets from a specific twitter user based on their screen name
     * @param {string} screen_name The user to lookup, based on their screen name
     * @param {int} count The amount of tweets to shorten the result to, this gets shortened after everything else, and will always include retweets
     * @param {int} max_id The max ID of the tweet to look for, used to limit results to not fetch older than already fetched
     * @param {int} since_id The last ID fetched, used to make sure we only get the newest tweets
     * @returns {Promise} returns a promise for better async handling
     */

    getTweet:function(screen_name, count, max_id, since_id){
        try {
            var client = this.getClient();
            return new Promise((resolve, reject) => {
                client.get('statuses/user_timeline', {screen_name: screen_name, count: count, max_id: max_id, since_id: since_id})
                .then(tweet => {
                    return resolve(tweet[0]);
                })
                .catch(error => {
                    return reject(log.error(error));
                });
            });
        } catch(error) {
            log.error(error);
        }
    }
}