const   _ = require('lodash'),
        log = require("../enum/consoleLogging"),
        func = require('../func/propFunctions'),
        cEmbed = require('../model/embeds');

module.exports = (member) => {
        client = require('../getters/twitterGetter').getClient();
        twitFolk = func.readFromFileSync("./storage/twitterFolk.json");
        user_to_follow = '';
        users_array = [];
        for(element in twitFolk) {
            user_to_follow += element+',';
            users_array.push(element);
        }
        return new Promise((resolve, reject) => {
            try {
                return resolve(client.stream('statuses/filter', {follow: user_to_follow },  function(stream) {
                    stream.on('data', function(tweet) {
                        if(config['twitter_module'].check_reply_to_tweets == false && !tweet.in_reply_to_status_id && !tweet.retweeted_status && !_.includes(users_array,tweet.user.id_str)){
        
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
    
                        channelToWriteTo_array = [];
                        for(ele in twitFolk) {
                            if(ele == tweet.user.id) {
                                _.forEach(twitFolk[ele], function(result){
                                    channelToWriteTo_array.push(member.channels.get(result['channel_ID']))
                                })
                            }
                        }
                        
                        for(var channel in channelToWriteTo_array) {
                            channelToWriteTo_array[channel].send(cEmbed.RichEmbed(
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
                        }
                    } else {
                        return reject('Please No Retweets');
                    }
                    });
                    setTimeout(function(){stream.destroy()},295000);
                }));
            } catch (error) {
                return reject((error));
            }
        });
    }
