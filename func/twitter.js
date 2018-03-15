const   Twitter = require('twitter'),
        config = require("../../config.json"),
        Discord = require("discord.js"),
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
            
        /**
        * Stream statuses filtered by keyword
        * number of tweets per second depends on topic popularity
        **/
       let tempChan;
       defChan = require("../storage/defaultChannel.json");
       DClient.guilds.forEach(element => {
           element.channels.forEach(channel => {
               if(channel.id === defChan["Testing Grounds"].defaultChannel) {
                   tempChan = channel;
               }
           });
       });       
       
        client.stream('statuses/filter', {follow: '205717291,923770736,828062956864864256' },  function(stream) {
            stream.on('data', function(tweet) {

                let tempText = '';
                let tempArr; 
                if(tweet.display_text_range) tempArr = tweet.display_text_range;
                //console.dir(tweet);
                //log(tweet.display_text_range);

                log(`I have detected a tweet from: ${tweet.user.screen_name}`);

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
                    log(`The tweet contained an image: ${tempImg}`);
                }

                tempChan.send(embed.RichEmbed(
                    [tweet.user.screen_name, "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"],
                    `${tweet.user.name} on Twitter`,
                    null,
                    0x1dcaff,
                    null,
                    `http://www.twitter.com/${tweet.user.screen_name}`,
                    tempImg,
                    `${tweet.user.profile_image_url_https}`,
                    `${tempText}`
                ));
            });
        
            stream.on('error', function(error) {
            log(error);
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