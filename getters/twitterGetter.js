const   Twitter = require('twitter'),
        _ = require('lodash'),
        log = require("../enum/consoleLogging"),
        cEmbed = require('../model/embeds');

module.exports = {

    getUserID:function(user_to_search_for){
        try {
            var client = this.getClient()
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
        
    }
}