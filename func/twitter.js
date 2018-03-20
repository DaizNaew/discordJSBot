const   Twitter = require('twitter'),
        _ = require('lodash'),
        config = require("../../config.json"),
        log = require("../enum/consoleLogging"),
        embed = require('../model/embeds');

module.exports = {
  
        initStream: function(DClient) {
            
            var client = new Twitter({
                consumer_key: config.consumer_key,
                consumer_secret: config.consumer_secret,
                access_token_key: config.access_token_key,
                access_token_secret: config.access_token_secret
            });
            
        client.stream('statuses/filter', {follow: '205717291,923770736,828062956864864256' },  function(stream) {
            stream.on('data', function(tweet) {
                const who_to_follow = [  
                    '205717291'             //DaizNaew
                    ,'923770736'            //Weefreemen
                    ,'828062956864864256'   //Memetwitter
                ];
                if(config.check_reply_to_tweets == false){
                    if(tweet.in_reply_to_status_id ) return;
                    if(tweet.retweeted_status && !_.includes(who_to_follow,tweet.user.id_str)) return /* log('Pop den booty bitch') */;
                }

                let tempChan,
                    channelsToPostInById,
                    defChan = require("../storage/defaultChannel.json");

                switch(tweet.user.id_str) {
                    case who_to_follow[0]:
                        channelsToPostInById = defChan["Testing Grounds"].defaultChannel;
                        break;
                    case who_to_follow[1]:
                        channelsToPostInById = defChan["Weef's hang out"].tweetChannel;
                        break;
                    default:
                        channelsToPostInById = defChan["Weef's hang out"].memeChannel;
                }
                
                DClient.guilds.forEach(element => {
                    element.channels.forEach(channel => {
                        if(channel.id === channelsToPostInById) {
                            tempChan = channel;
                        }
                    });
                });

                let tempText = '',
                    tempArr;
                if(tweet.display_text_range) tempArr = tweet.display_text_range;

                //console.dir(tweet);
                //log(tweet.display_text_range);

                log.tweet(`I have detected a tweet from: ${tweet.user.screen_name}`);

                if(tempArr){
                    for(i = tempArr[0]; i <= tempArr[1]; i++){
                        tempText += tweet.text[i];
                    }
                } else {
                    tempText = tweet.text;
                }
                
                let tempImg = null;
                if(tweet.entities.media){
                    if(tweet.entities.media[0].media_url_https) tempImg = tweet.entities.media[0].media_url_https;
                    log.tweet(`The tweet contained an image: ${tempImg}`);
                }

                tempChan.send(embed.RichEmbed(
                    [tweet.user.screen_name, "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"],
                    `${tweet.user.name} on Twitter`,
                    null,
                    0x1da1f2, //Maybe change this to tweet.user.profile_link_color
                    null,
                    `http://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
                    tempImg,
                    `${tweet.user.profile_image_url_https}`,
                    `${tempText}`
                ));
            });
        
            stream.on('error', function(error) {
            log.error('Twitter module failed with the error of: '+error);
            });
        });
        
    },
    getUserTweet:function(searchParam){
        var client = new Twitter({
            consumer_key: config.consumer_key,
            consumer_secret: config.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: config.access_token_secret
        });
        client.get('search/tweets', {q: searchParam}, function(error, tweets, response) {
            
         });
    }
}