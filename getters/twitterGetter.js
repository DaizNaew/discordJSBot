const   Twitter = require('twitter'),
        _ = require('lodash'),
        log = require("../enum/consoleLogging"),
        cEmbed = require('../model/embeds');

module.exports = {

    createStream: function(DClient, user_to_follow,channelToWriteTo) {
        config = require("../config.json");
        var client = new Twitter({
            consumer_key: config['twitter_module'].twitter_consumer_key,
            consumer_secret: config['twitter_module'].twitter_consumer_secret,
            access_token_key: config['twitter_module'].twitter_access_token_key,
            access_token_secret: config['twitter_module'].twitter_access_token_secret
        });

        return new Promise((resolve, reject) => {
            return resolve(client.stream('statuses/filter', {follow: user_to_follow },  function(stream) {
                stream.on('data', function(tweet) {
                    if(config['twitter_module'].check_reply_to_tweets == false){
                        if(tweet.in_reply_to_status_id ) return reject();
                        if(tweet.retweeted_status && user_to_follow !== tweet.user.id_str) return reject();
                    }
    
                    let tempText = '',
                        tempArr;
                    if(tweet.display_text_range) tempArr = tweet.display_text_range;

                    if(tempArr){
                        for(i = tempArr[0]; i <= tempArr[1]; i++){
                            tempText += tweet.text[i];
                        }
                    } else {
                        tempText = tweet.text;
                    }

                    let twitter_log_response = '';
                    let tempVideo = null;
                    let tempImg = null;
                    if(tweet.entities.media){
                        if(tweet.entities.media[0].media_url_https) {
                            tempImg = tweet.entities.media[0].media_url_https;
                            twitter_log_response += `and This tweet contained an image: ${tempImg}`;
                        }
                    }
                    if(tweet.entities.urls[0]){
                        if(tweet.entities.urls[0]['expanded_url'].includes('youtu')) {
                            tempVideo = tweet.entities.urls[0]['expanded_url'];
                            twitter_log_response += `and This tweet contained an Youtube: ${tempVideo}`;
                        }
                    }
                    log.tweet(`I have detected a tweet from: ${tweet.user.screen_name} ${twitter_log_response}`);
                    channelToWriteTo.send('`Now following`');
                    channelToWriteTo.send(cEmbed.RichEmbed(
                        [tweet.user.screen_name, "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"],
                        `${tweet.user.name} on Twitter`,
                        null,
                        `0x${tweet.profile_link_color}`, //Official Twitter: 0x1da1f2
                        null,
                        `http://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
                        tempImg,
                        `${tweet.user.profile_image_url_https}`,
                        `${tempText}`
                    ));
                    return tweet;
                });
            }));
        });
    },
    
    getUserID:function(user_to_search_for){
        config = require("../config.json");
            
        var client = new Twitter({
            consumer_key: config['twitter_module'].twitter_consumer_key,
            consumer_secret: config['twitter_module'].twitter_consumer_secret,
            access_token_key: config['twitter_module'].twitter_access_token_key,
            access_token_secret: config['twitter_module'].twitter_access_token_secret
        });

        return new Promise((resolve, reject) => {
            client.get('users/show', {screen_name: user_to_search_for}, function(error, response) {
                if(error) {
                    return reject(log.error('Failed to find the user'));
                }
            return resolve(response);
            });
        });
    }
}
